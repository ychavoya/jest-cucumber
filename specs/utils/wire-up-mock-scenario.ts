import { parseFeature } from '../../src';
import { Options } from '../../src/configuration';
import { createDefineFeature, DefineFeatureFunction } from '../../src/feature-definition-creation';
import { ParsedFeature } from '../../src/models';
import { MockTestRunner } from './mock-test-runner/mock-test-runner';

export type MockStepDefinitions = (feature: ParsedFeature, defineFeature: DefineFeatureFunction) => void;

export const wireUpMockFeature = (
  mockTestRunner: MockTestRunner,
  featureFile: string,
  mockStepDefinitions: MockStepDefinitions | null,
  options?: Options,
) => {
  const defineMockFeature = createDefineFeature();
  const mockFeature = parseFeature(featureFile, {
    ...options,
    runner: {
      describe: mockTestRunner.describe,
      test: mockTestRunner.test,
    },
  });

  if (mockStepDefinitions) {
    mockStepDefinitions(mockFeature, defineMockFeature);
  }
};
