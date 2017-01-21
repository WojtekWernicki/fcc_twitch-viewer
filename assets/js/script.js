var streamsContainer = document.querySelector('.streams');
var apiURL = 'https://wind-bow.gomix.me/twitch-api/users/';
var streams = [];
var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function makeURL(type, name) {
    return `https://wind-bow.gomix.me/twitch-api/${type}/${name}`;
}

function getStreams() {
    streamers.forEach(function(streamer) {
        $.getJSON(makeURL('streams', streamer), function(data) {
            var game,
                status
            if (data.stream === null) {
                game = "Offline";
                status = "offline";
            } else if (data.stream === undefined) {
                game = "Account Closed";
                status = "offline";
            } else {
                game = data.stream.game;
                status = "online";
            };
            $.getJSON(makeURL('channels', streamer), function(data) {
                html = `
                <div class="stream">
                    <div class="avatar ${status === "online" ? 'online' : 'offline'}">
                        <img src="${data.logo != null ? data.logo : "https://placehold.it/300?text=WAT"}">
                    </div>
                    <div class="user"><a href="${data.url}" target="_blank">${name = data.display_name != null ? data.display_name : streamer}</a></div>
                    <div class="game">${status === "online" ? data.status : "Offline"}</div>
                </div>
                `;
                $('.streams').append(html);
            });
        });
    });
};

$(document).ready(function() {
    getStreams();
});
