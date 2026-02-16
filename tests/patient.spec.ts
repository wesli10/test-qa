import { test, expect } from '@playwright/test';
import { getTestUser } from '../utils/fileUtils';
import { UsersPage } from '../pages/UsersPage';


test('should verify that the user has been created.', async ({ page }) => {

    const user = getTestUser();

    const usersPage = new UsersPage(page);

    await usersPage.goto();

    await expect(
        page.getByText(user.fullName)
    ).toBeVisible();

});

