import Foundation
import CoreData
import Security
import CryptoKit

class DataController: ObservableObject {
    let container = NSPersistentContainer(name: "AccountModel")

    init() {
        container.loadPersistentStores { desc, error in
            if let error = error {
                print("Failed to load the data \(error.localizedDescription)")
            }
        }
    }

    func save(context: NSManagedObjectContext) {
        do {
            try context.save()
            print("Data saved")
        } catch {
            print("We can NOT save data...")
        }
    }

    func addAccount(name: String, username: String, password: String, context: NSManagedObjectContext) {
        let account = Account(context: context)
        account.id = UUID()
        account.date = Date()
        account.name = name
        account.username = username

        if let encryptedPassword = savePasswordToKeychain(password) {
            account.password = encryptedPassword
        }

        save(context: context)
    }

    func editAccount(account: Account, name: String, username: String, password: String, context: NSManagedObjectContext) {
        account.date = Date()
        account.name = name
        account.username = username

        if let encryptedPassword = savePasswordToKeychain(password) {
            account.password = encryptedPassword
        }

        save(context: context)
    }

    private func savePasswordToKeychain(_ password: String) -> String? {
        guard let key = SymmetricKey.generate(randomBytes: 32) else {
            print("Error generating encryption key")
            return nil
        }

        let salt = UUID().uuidString
        let saltedPassword = password + salt

        do {
            let encryptedPasswordData = try AES.GCM.seal(saltedPassword.data(using: .utf8)!, using: key).combined
            let base64EncodedPassword = encryptedPasswordData.base64EncodedString()

            // Save the encryption key to the Keychain
            let keyData = key.withUnsafeBytes { Data($0) }
            let keychainQuery: [String: Any] = [
                kSecClass as String: kSecClassGenericPassword,
                kSecAttrService as String: "com.yourapp.encryptionKey", // Unique identifier for your app
                kSecValueData as String: keyData
            ]

            let status = SecItemAdd(keychainQuery as CFDictionary, nil)
            guard status == errSecSuccess else {
                print("Error saving encryption key to Keychain")
                return nil
            }

            return base64EncodedPassword
        } catch {
            print("Error encrypting password")
            return nil
        }
    }

    private func decryptPasswordFromKeychain(_ encryptedPassword: String) -> String? {
        // Retrieve the encryption key from the Keychain
        let keychainQuery: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: "com.yourapp.encryptionKey",
            kSecReturnData as String: kCFBooleanTrue!,
            kSecMatchLimit as String: kSecMatchLimitOne
        ]

        var keyData: AnyObject?
        let keyStatus = SecItemCopyMatching(keychainQuery as CFDictionary, &keyData)

        guard keyStatus == errSecSuccess, let key = keyData as? Data else {
            print("Error retrieving encryption key from Keychain")
            return nil
        }

        // Decrypt the password using the retrieved key
        let keyObject = SymmetricKey(data: key)

        guard let encryptedData = Data(base64Encoded: encryptedPassword) else {
            print("Error decoding base64-encoded password")
            return nil
        }

        do {
            let decryptedData = try AES.GCM.open(encryptedData, using: keyObject)
            let decryptedPassword = String(data: decryptedData, encoding: .utf8)
            return decryptedPassword
        } catch {
            print("Error decrypting password")
            return nil
        }
    }
}
