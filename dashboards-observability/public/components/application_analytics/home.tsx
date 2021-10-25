/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import React from 'react';
import { AppTable } from './components/app_table';
import { Application } from './components/application';

export type ApplicationType = {
  name: string;
  id: string;
  composition: string;
  currentAvailability: string;
  availabilityMetrics: string;
  dateCreated: string;
  dateModified: string;
};

const dateString = new Date().toISOString();

const dummyApplication: ApplicationType[] = [{
  name: "Cool Application", 
  id: "id", 
  composition: "Payment, user_db",
  currentAvailability: "Available",
  availabilityMetrics: "Error rate: 0.80%, Throughput: 0.94%, Latency: 600ms",
  dateCreated: dateString, 
  dateModified: dateString
}];

export const Home = () => {
  return (
    <AppTable 
      loading={false}
      applications={dummyApplication}
    />
    // <Application 
    //   disabled={false}
    // />
  );
};