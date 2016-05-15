'use strict';

const Script = require('smooch-bot').Script;

const scriptRules = require('./script.json');

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m Simply Wall St Coffee bot!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Great! I'll call you ${name}`))
                .then(() => 'askCoffee');
        }
    },
    
        askCoffee: {
        prompt: (bot) => bot.say('Do you want coffee today?'),
        receive: (bot, message) => {
            const coffee = message.text;
            return bot.getProp('name')
                .then(() => bot.say(`Doesn't matter what you say ${name} you are getting a coffee!`))
                .then(() => 'finish');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, Adam is too lazy and didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'finish');
        }
    }
});
