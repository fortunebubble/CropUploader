MySlingShotName = 'simpleUploader';
// standard Slingshot
Slingshot.fileRestrictions(MySlingShotName, {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited)
});

if(Meteor.isServer)
{
    // standard Slingshot
    Slingshot.createDirective(MySlingShotName, Slingshot.S3Storage, {
      AWSAccessKeyId: Meteor.settings.AWSAccessKeyId,
      AWSSecretAccessKey: Meteor.settings.AWSSecretAccessKey,
      region:Meteor.settings.AWSRegion,
      bucket:'app-avatar',
      acl: "public-read",
      authorize: function () {
        // Deny uploads if user is not logged in.
        if (!this.userId) {
          var message = "Please login before posting files";
          throw new Meteor.Error("Login Required", message);
        }
        return true;
      },
      // you must provide a key methods, but CropUploader.init will override it
      key: function (file) {
      //Store file into a directory by the user's username.
      var user = Meteor.users.findOne(this.userId);
      return user.username + "/" + file.name;
      }
    });
    // call CropUloader.init
    CropUploader.init(MySlingShotName, Meteor.settings.S3Directory);
    console.log('hello');
}
if(Meteor.isClient)
{
    var directory = ''; // same as Meteor.settings.S3Directory
    CropUploader.init(MySlingShotName, directory);
    console.log('hello there');
    Template.images.onCreated(function(){
        this.subscribe('cropUploaderImages');
    })
    Template.images.onRendered(function(){
      this.$('.preview').addClass('hidden');
    });
    Template.images.helpers({
      images: function() {
        return CropUploader.images.find();
      }
    });
}
