'use strict';

angular.module('sher.version', [
  'sher.version.interpolate-filter',
  'sher.version.version-directive'
])

.value('version', '0.1');
