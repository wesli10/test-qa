import { test } from '@playwright/test';
import { getTestUser } from '../utils/fileUtils';
import { PatientsPage } from '../pages/PatientsPage';
import { PatientProfilePage } from '../pages/PatientProfilePage';
import { FinancialPage } from '../pages/FinancialPage';

test('should create a payment for patient', async ({ page }) => {

  const patient = getTestUser();

  const patientsPage = new PatientsPage(page);
  const profilePage = new PatientProfilePage(page);
  const financialPage = new FinancialPage(page);

  await patientsPage.goto();

  await patientsPage.openPatient(patient.fullName);

  await profilePage.goToFinancial();

  await financialPage.createPayment('100');

  await financialPage.expectPaymentCreated();

});
