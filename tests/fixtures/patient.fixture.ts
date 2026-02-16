import { test as base, expect, Page } from '@playwright/test';
import fs from 'fs';

type Fixtures = {
  patient: any;
};

interface Patient {
    [key: string]: any;
}

interface UseCallback {
    (patient: Patient): Promise<void>;
}

export const test = base.extend<Fixtures>({

    patient: async ({}, use: UseCallback) => {

    const patient = JSON.parse(
        fs.readFileSync('.auth/patient.json', 'utf-8')
    );

    await use(patient);

    }

});

export { expect } from '@playwright/test';
