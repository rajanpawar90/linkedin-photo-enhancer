import { EventData, Page } from '@nativescript/core';
import { PhotoViewModel } from './view-models/photo-view-model';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new PhotoViewModel();
}