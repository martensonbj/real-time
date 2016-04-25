"use strict";

function StorePoll(pollId, adminId, title, options) {
  this.pollId = pollId;
  this.adminId = adminId;
  this.title = title;
  this.options = options;
  this.votes = {};
  this.active = true;
}

module.exports = StorePoll;
