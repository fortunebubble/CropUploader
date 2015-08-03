Package.onUse(function(api){
  share_packages=[
  'standard-app-packages',
  'accounts-password',
  'edgee:slingshot@0.7.1',
  'jamgold:cropuploader@0.0.3_4',
  ];
  share_files=[
    'lib/s3Storage/config.js'
  ];
  api.use(share_packages,['client', 'server']);
  api.addFiles(share_files, ['client','server']);

});
