const _ = require('lodash')
const variable = require('./variable')

const startup = _.now()

module.exports = {
  cleanup: async function () {
    let waitForIt = async (resolve, reject) => {
      if (_.isNil(global.db) || !global.db.engine.connected || _.isNil(global.systems) || _.now() - startup < 10000) {
        return setTimeout(() => waitForIt(resolve, reject), 10)
      }

      await global.db.engine.remove('systems.alias', {})
      await global.db.engine.remove('systems.keywords', {})
      await global.db.engine.remove('systems.cooldown', {})
      await global.db.engine.remove('systems.cooldown.viewers', {})
      await global.db.engine.remove('keywords', {})
      await global.db.engine.remove('settings', {})
      await global.db.engine.remove('timers', {})
      await global.db.engine.remove('timers.responses', {})
      await global.db.engine.remove('users_ignorelist', {})
      await global.db.engine.remove('cache', {})
      await global.db.engine.remove('cache.when', {})
      await global.db.engine.remove('cache.users', {})
      await global.db.engine.remove('gambling.duel', {})
      await global.db.engine.remove('widgetsEventList', {})
      await global.db.engine.remove('systems.quotes', {})

      await global.db.engine.remove('users', {})
      await global.db.engine.remove('users.points', {})
      await global.db.engine.remove('users.messages', {})
      await global.db.engine.remove('users.online', {})
      await global.db.engine.remove('users.bits', {})
      await global.db.engine.remove('users.tips', {})
      await global.db.engine.remove('users.watched', {})

      // game fightme
      await global.db.engine.remove('games.fightme.settings', {})
      await global.db.engine.remove('games.fightme.users', {})

      // game duel
      await global.db.engine.remove('games.duel.settings', {})
      await global.db.engine.remove('games.duel.users', {})

      // remove moderation
      await global.db.engine.remove(global.systems.moderation.collection.settings, {})
      await global.db.engine.remove(global.systems.moderation.collection.permits, {})
      await global.db.engine.remove(global.systems.moderation.collection.warnings, {})

      // remove timers
      await global.db.engine.remove(global.systems.timers.collection.settings, {})
      await global.db.engine.remove(global.systems.timers.collection.data, {})
      await global.db.engine.remove(global.systems.timers.collection.responses, {})

      // remove raffles
      await global.db.engine.remove(global.systems.raffles.collection.settings, {})
      await global.db.engine.remove(global.systems.raffles.collection.data, {})

      // remove custom commands
      await global.db.engine.remove(global.systems.customCommands.collection.settings, {})
      await global.db.engine.remove(global.systems.customCommands.collection.data, {})
      await global.db.engine.remove(global.systems.customCommands.collection.responses, {})

      // remove bets
      await global.db.engine.remove(global.systems.bets.collection.data, {})

      // remove voting
      await global.db.engine.remove(global.systems.polls.collection.data, {})
      await global.db.engine.remove(global.systems.polls.collection.votes, {})

      // remove events
      await global.db.engine.remove('events', {})
      await global.db.engine.remove('events.filters', {})
      await global.db.engine.remove('events.operations', {})

      await global.db.engine.remove('core.oauth.settings', {})

      global.oauth.settings.general.channel = 'soge__'
      await variable.isEqual('global.oauth.settings.general.channel', 'soge__')

      global.oauth.settings.general.owners = ['soge__']
      await variable.isEqual('global.oauth.settings.general.owners', ['soge__'])

      global.oauth.settings.broadcaster.username = 'broadcaster'
      await variable.isEqual('global.oauth.settings.broadcaster.username', 'broadcaster')

      // remove compact db - compactDb tests
      await global.db.engine.remove('compact', {})

      // remove user settings
      await global.db.engine.remove(global.users.collection.settings, {})

      resolve()
    }
    return new Promise((resolve, reject) => {
      waitForIt(resolve, reject)
    })
  }
}
