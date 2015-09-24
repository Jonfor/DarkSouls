if (Meteor.isClient) {

  Template.bodyIsReadyTemplate.events({
    'click #bodyIsReady': function () {
      new Audio('/start.mp3').play();
      document.getElementById('bodyIsReady').setAttribute("disabled", "true");
      document.getElementById('human').checked = false;
      document.getElementById('ring').checked = false;
      Session.set('isHuman', false);
      Session.set('isRing', false);
    },

    'click #human': function (event) {
      new Audio('parry.mp3').play();
      Session.set('isHuman', event.target.checked);

      isBodyReady();
    },

    'click #ring': function (event) {
      new Audio('parry.mp3').play();
      Session.set('isRing', event.target.checked);

      isBodyReady();
    }
  });

  function isBodyReady() {
    if (Session.get('isHuman') && Session.get('isRing')) {
      document.getElementById('bodyIsReady').removeAttribute("disabled");
    }
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
