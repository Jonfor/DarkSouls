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

      if (event.target.checked) {
        Session.set('isHuman', true);
      } else {
        Session.set('isHuman', false);
      }

      isBodyReady();
    },

    'click #ring': function (event) {
      new Audio('parry.mp3').play();

      if (event.target.checked) {
        Session.set('isRing', true);
      } else {
        Session.set('isRing', false);
      }

      isBodyReady();
    }
  });

  function isBodyReady() {
    if (Session.get('isHuman') && Session.get('isRing')) {
      document.getElementById('bodyIsReady').removeAttribute("disabled");
    } else {
      document.getElementById('bodyIsReady').setAttribute("disabled", "true");
    }
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
