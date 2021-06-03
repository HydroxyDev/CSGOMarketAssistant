const fetch = require("node-fetch");
const Discord = require("discord.js");
require("dotenv").config();

module.exports = function (msg) {
    if (msg.content.length == 4) msg.reply("Please enter the item you are searching.");
    else giveanswer(msg)
}

async function giveanswer(msg) {
    //fetch from api.steamapis
    const api_url = `https://api.steamapis.com/market/item/730/${encodeURIComponent(msg.content.substring(5))}?api_key=${process.env.APIKEY}`
    const api_response = await fetch(api_url);
    const api_data = await api_response.json();

    //use api data to get url for history graph
    let label0 = api_data.median_avg_prices_15days[0][0];
    var labels = [label0];

    let data0 = api_data.median_avg_prices_15days[0][1];
    var data = [data0]

    for (j = 1; api_data.median_avg_prices_15days[j] != undefined;) {
        labels.push(api_data.median_avg_prices_15days[j][0])
        j++
    }
    for (k = 1; api_data.median_avg_prices_15days[k] != undefined;) {
        data.push(api_data.median_avg_prices_15days[k][1])
        k++
    }

    //create and send chart to get chart_url
    let chart = {
        type: 'line', // Show a bar chart
        data: {
            labels: labels, // Set X-axis labels
            backgroundcolor: 'rgb(255, 255, 255)',
            datasets: [{
                label: 'Price history - ' + msg.content.substring(5),
                data: data, // Add data to the chart
                fill: false,
                borderColor: 'rgb(0, 173, 238)'
            }]
        },
        options: {
            legend: {
                fontColor: "white"
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                    }
                }]
            }
        }
    }
    const encodedChart = encodeURIComponent(JSON.stringify(chart));
    const chart_url = `https://quickchart.io/chart?c=${encodedChart}`;


    //fetch price
    const price_url =
        "https://steamcommunity.com/market/priceoverview/?appid=730&currency=3&market_hash_name=" + encodeURIComponent(msg.content.substring(5));

    const price_response = await fetch(price_url);
    const price_data = await price_response.json();
    const {
        lowest_price,
        volume,
        median_price
    } = price_data;

    //get img_url from api_data
    const img_url = api_data.image;


    //create msgEmbed + send it
    const itemEmbed = new Discord.MessageEmbed()
        .setColor('#00adee')
        .setTitle(msg.content.substring(4))
        .setURL('https://steamcommunity.com/market/listings/730/' + encodeURIComponent(msg.content.substring(5)))
        .setDescription('Market price: ' + msg.content.substring(4))
        .setThumbnail(img_url)
        .addFields({
            name: 'Lowest price',
            value: lowest_price
        }, {
            name: 'Median price',
            value: median_price
        }, {
            name: 'Sold in the last 24 hours',
            value: volume
        })
        .setImage(chart_url)
        .setTimestamp()
        .setFooter('By Hydroxy#2491');

    msg.channel.send(itemEmbed);
}