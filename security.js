/*
 *  These event handlers serve as a potential failsafe in case of an accidental token leak by the bot
 *  If one of these events are fired without the flag being set by the bot, it will be assumed that it was called by another program with the token
 *  A known flaw with this system is that it does not scale well. If the bot performs multiple of these actions in a short time frame, the flag may be overwritten
 */

module.exports = {
	eventHandlers: function () {
		bot.on("roleCreate", async function(role) {
			var audit = await role.guild.fetchAuditLogs({type: "ROLE_CREATE"}).then(audit => audit.entries.first());
			if(audit.executor.id == selfID) {
				if(lastRiskyAction == "ROLE_CREATE") {
					lastRiskyAction = null;
				}
				else {
					autolockdown();
				}
			}
		});
		bot.on("roleUpdate", async function(role) {
			var audit = await role.guild.fetchAuditLogs({type: "ROLE_UPDATE"}).then(audit => audit.entries.first());
			if(audit.executor.id == selfID) {
				if(lastRiskyAction == "ROLE_UPDATE") {
					lastRiskyAction = null;
				}
				else {
					autolockdown();
				}
			}
		});
		bot.on("channelDelete", async function(channel) {
			var audit = await channel.guild.fetchAuditLogs({type: "CHANNEL_DELETE"}).then(audit => audit.entries.first());
			if(audit.executor.id == selfID) {
				if(lastRiskyAction == "CHANNEL_DELETE") {
					lastRiskyAction = null;
				}
				else {
					autolockdown();
				}
			}
		});
		bot.on("guildMemberUpdate", async function (oldMember, newMember) {
			if(!oldMember.roles.equals(newMember.roles)) {
				var audit = await oldMember.guild.fetchAuditLogs({type: "MEMBER_ROLE_UPDATE"}).then(audit => audit.entries.first());
				if(audit.executor.id == selfID) {
					if(lastRiskyAction == "MEMBER_ROLE_UPDATE") {
						lastRiskyAction = null;
					}
					else {
						autolockdown();
					}
				}
			}
		});
	}
}

async function autolockdown() {
	var servers = Array.from(bot.guilds.values());
	for(var i=0; i<servers.length; i++) {
		var currentServer = servers[i];
		await currentServer.owner.send("If you are receiving this message, DashBot has entered lockdown. The security of DashBot cannot be verified, and as such, it has left all servers.").then(function() {
			if(lockdownTest) {
				currentServer.owner.send("This lockdown was merely a system test. The bot has not left");
			}
			else {
				currentServer.leave();
			}
		});
	}
}
