#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { DieterStack } from '../lib/dieter-stack';

const app = new cdk.App();
new DieterStack(app, 'DieterStack');
