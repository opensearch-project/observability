/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  contextMenuCreateReportDefinition,
  contextMenuViewReports,
  generateInContextReport
} from '../reporting_context_menu_helper';

describe('reporting_context_menu_helper tests', () => {
  test('contextMenuViewReports will redirect', () => {
    const savedLocation = window.location;
    // @ts-ignore
    delete window.location;

    window.location = {
      ...savedLocation,
      assign: jest.fn(),
    };
    contextMenuViewReports();
    expect(window.location.assign).toBeCalledWith('reports-dashboards#/');
    window.location = savedLocation;
  });

  test('contextMenuCreateReportDefinition', () => {
    const savedLocation = window.location;
    // @ts-ignore
    delete window.location;

    window.location = {
      ...savedLocation,
      assign: jest.fn(),
    };
    contextMenuCreateReportDefinition('https://mock-base.uri/mock-base-path');
    expect(window.location.assign).toBeCalledWith(
      'reports-dashboards#/create?previous=notebook:mock-base-path?timeFrom=0?timeTo=0'
    );
    window.location = savedLocation;
  });

  function generateReport(
    status: number,
    filename: string,
    tenant: string,
    setToast: (...args: any[]) => void,
    toggleReportingLoadingModal: (toggle: boolean) => void
  ) {
    const fileFormat = filename.match(/\.([^.]+)$/)?.[1] || 'pdf';
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status,
        json: () => Promise.resolve({ filename, fileFormat, data: 'test-data' }),
        text: () => Promise.resolve({ tenant }),
      })
    );
    const props = { setToast };
    return generateInContextReport(fileFormat, props, toggleReportingLoadingModal);
  }

  it('generates csv for private tenant', async () => {
    const setToast = jest.fn();
    const toggleReportingLoadingModal = jest.fn();
    await generateReport(200, 'test.csv', '__user__', setToast, toggleReportingLoadingModal);
    expect(toggleReportingLoadingModal).toBeCalledWith(true);
    expect(setToast).toBeCalledWith('Successfully generated report.', 'success');
  });

  it('generates pdf for global tenant', async () => {
    const setToast = jest.fn();
    const toggleReportingLoadingModal = jest.fn();
    await generateReport(200, 'test.pdf', '', setToast, toggleReportingLoadingModal);
    expect(toggleReportingLoadingModal).toBeCalledWith(true);
    expect(setToast).toBeCalledWith('Successfully generated report.', 'success');
  });

  it('generates png for custom tenant', async () => {
    const setToast = jest.fn();
    const toggleReportingLoadingModal = jest.fn();
    await generateReport(200, 'test.png', 'custom_tenant', setToast, toggleReportingLoadingModal);
    expect(toggleReportingLoadingModal).toBeCalledWith(true);
    expect(setToast).toBeCalledWith('Successfully generated report.', 'success');
  });

  it('generates png for custom tenant', async () => {
    const setToast = jest.fn();
    const toggleReportingLoadingModal = jest.fn();
    await generateReport(200, 'test.png', 'custom_tenant', setToast, toggleReportingLoadingModal);
    expect(toggleReportingLoadingModal).toBeCalledWith(true);
    expect(setToast).toBeCalledWith('Successfully generated report.', 'success');
  });

  it('handles 404 error', async () => {
    const setToast = jest.fn();
    const toggleReportingLoadingModal = jest.fn();
    await generateReport(404, 'test.png', 'custom_tenant', setToast, toggleReportingLoadingModal);
    expect(toggleReportingLoadingModal).toBeCalledWith(true);
    expect(setToast).toBeCalledWith(
      'Download error',
      'danger',
      'There was an error generating this report.'
    );
  });

  it('handles permission error', async () => {
    const setToast = jest.fn();
    const toggleReportingLoadingModal = jest.fn();
    await generateReport(403, 'test.png', 'custom_tenant', setToast, toggleReportingLoadingModal);
    expect(toggleReportingLoadingModal).toBeCalledWith(true);
    expect(setToast).toBeCalledWith(
      'Error generating report,',
      'danger',
      'Insufficient permissions. Reach out to your OpenSearch Dashboards administrator.'
    );
  });

  it('handles timeout error', async () => {
    const setToast = jest.fn();
    const toggleReportingLoadingModal = jest.fn();
    await generateReport(503, 'test.png', 'custom_tenant', setToast, toggleReportingLoadingModal);
    expect(toggleReportingLoadingModal).toBeCalledWith(true);
    expect(setToast).toBeCalledWith(
      'Error generating report.',
      'danger',
      'Timed out generating on-demand report from notebook. Try again later.'
    );
  });

  it('handles tenant errors', async () => {
    global.fetch = jest.fn(() => Promise.reject({ status: 500 }));
    const setToast = jest.fn();
    const toggleReportingLoadingModal = jest.fn();
    await generateInContextReport('csv', { setToast }, toggleReportingLoadingModal);
    expect(toggleReportingLoadingModal).toBeCalledWith(true);
    expect(setToast).toBeCalledWith('Tenant error', 'danger', 'Failed to get user tenant.');
  });
});
