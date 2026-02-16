import { test } from './fixtures/patient.fixture';
import { PatientsPage } from '../pages/PatientsPage';
import { PatientProfilePage } from '../pages/PatientProfilePage';
import { FinancialPage } from '../pages/FinancialPage';

test('should create a payment for patient', async ({ page, patient }: { page: any; patient: any }) => {


  const patientsPage = new PatientsPage(page);''
  const profilePage = new PatientProfilePage(page);
  const financialPage = new FinancialPage(page);

  await patientsPage.openPatient(patient.fullName);

  await profilePage.goToFinancial(patient.fullName);

  await financialPage.createPayment('100');

  await financialPage.expectPaymentCreated();

});
