import { test, expect } from './fixtures/patient.fixture';
import { UsersPage } from '../pages/UsersPage';
import { PatientsPage } from '../pages/PatientsPage';
import { Page } from '@playwright/test';


test('should verify that the user has been created.', async ({ page  }: { page: Page}) => {


    const patientsPage = new PatientsPage(page);
    const usersPage = new UsersPage(page);

    const patient = await usersPage.createUser();

    await patientsPage.openPatient(patient.fullName);

    await expect(
        page.getByText(patient.fullName)
    ).toBeVisible();

});

