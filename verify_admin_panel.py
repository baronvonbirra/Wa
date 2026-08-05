import time
import os
from playwright.sync_api import sync_playwright

def run():
    print("Starting integration test for Admin Control Panel...")

    # Ensure screenshot directory exists
    os.makedirs("verification_screenshots", exist_ok=True)

    with sync_playwright() as p:
        # Launch browser headlessly
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Navigate to the app with base URL
        print("Navigating to http://localhost:5173/Wa/ ...")
        page.goto("http://localhost:5173/Wa/")
        page.wait_for_timeout(2000)
        page.screenshot(path="verification_screenshots/01_landing_page.png")

        # 2. Select Lily (Sofia) profile card
        print("Selecting Lily's profile...")
        # Check for Lily profile cards
        lily_card = page.locator("button:has-text('Lily')")
        if not lily_card.is_visible():
            lily_card = page.get_by_role("button").first

        lily_card.click()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification_screenshots/02_home_map.png")

        # 3. Open Settings Modal
        print("Opening Settings modal...")
        settings_button = page.get_by_role("button", name="Settings")
        settings_button.click()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification_screenshots/03_settings_modal.png")

        # 4. Open Admin Control Panel
        print("Clicking Admin Control Panel button...")
        admin_button = page.get_by_role("button", name="Admin Control Panel")
        admin_button.click()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification_screenshots/04_admin_login_gate.png")

        # 5. Type Password & Unlock
        print("Entering password 'Japanese'...")
        password_input = page.locator("input[type='password']")
        password_input.fill("Japanese")
        page.screenshot(path="verification_screenshots/05_password_filled.png")

        print("Clicking Unlock Access...")
        unlock_button = page.get_by_role("button", name="UNLOCK ACCESS")
        unlock_button.click()
        page.wait_for_timeout(1500)
        page.screenshot(path="verification_screenshots/06_admin_dashboard.png")

        # Verify success
        if page.locator("text=ADMIN PORTAL").is_visible() or page.locator("text=⚡ SYSTEM QUICK OVERVIEW").is_visible():
            print("✅ Successfully unlocked and loaded the Admin Control Panel!")
        else:
            print("❌ Failed to load the Admin Control Panel dashboard.")
            browser.close()
            return

        # 6. Navigate to User Manager
        print("Switching to USER MANAGER tab...")
        user_tab = page.get_by_role("button", name="👥 USER MANAGER")
        user_tab.click()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification_screenshots/07_user_manager_tab.png")

        # 7. Navigate to Progress Editor
        print("Switching to PROGRESS EDITOR tab...")
        progress_tab = page.get_by_role("button", name="📊 PROGRESS EDITOR")
        progress_tab.click()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification_screenshots/08_progress_editor_tab.png")

        # 8. Navigate to Vocabulary Tracker
        print("Switching to VOCAB TRACKER tab...")
        vocab_tab = page.get_by_role("button", name="📚 VOCAB TRACKER")
        vocab_tab.click()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification_screenshots/09_vocab_tracker_tab.png")

        # 9. Navigate to Achievement & Shop
        print("Switching to ACHIEVEMENT & SHOP tab...")
        shop_tab = page.get_by_role("button", name="🏆 ACHIEVEMENT & SHOP")
        shop_tab.click()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification_screenshots/10_shop_rewards_tab.png")

        # 10. Exit to Map
        print("Clicking EXIT TO MAP...")
        exit_button = page.get_by_role("button", name="🗺️ EXIT TO MAP")
        exit_button.click()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification_screenshots/11_back_to_map.png")

        print("Integration test finished successfully!")
        browser.close()

if __name__ == "__main__":
    run()
