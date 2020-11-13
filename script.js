'use strict'

let apiKey = 'hKnbe0MVFfV41bmHaWwjU1uJtrFTgSgWVEuAxLCc'
let baseUrl = 'https://developer.nps.gov/api/v1/parks/'

function formatQueryParams(params) {
  let queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&')
}

function renderResults(responseJson) {
  $('.results').empty()
  for (let i = 0; i < responseJson.data.length; i++) {
    $('.results').append(`
    <div class="park-attributes">
    <a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].fullName}</a>
    <p>Address Type: ${responseJson.data[i].addresses[0].type}
    <br>
    ${responseJson.data[i].addresses[0].line1}<br>
    ${responseJson.data[i].addresses[0].line2}<br>
    ${responseJson.data[i].addresses[0].line3}<br>
    ${responseJson.data[i].addresses[0].city}<br>
    ${responseJson.data[i].addresses[0].stateCode}<br>
    ${responseJson.data[i].addresses[0].postalCode}</p>
    <br>
    <p>Located in: ${responseJson.data[i].states}</p>
    <p>${responseJson.data[i].description}</p>
    </div>
    `)
  }
  $('.results').removeClass('hidden')
}

function getParks(query, limit=10) {
  let params = {
    
    stateCode:query,
    limit,
    api_key:apiKey
    
  }
  let queryString = formatQueryParams(params)
  let url = baseUrl + '?' + queryString
  console.log(url)
  fetch(url)
    .then(response => response.json())
    .then(function(responseJson){
      renderResults(responseJson)
      console.log(responseJson.data)
    })

}

function handleSubmit() {
  $('#location').submit(event => {
    event.preventDefault()
    let state = $('#state').val()
    let limit = $('#max-results').val()
    if (limit === '') {
      limit = 10
    }
    getParks(state, limit)
  })
}

$(function() {
  handleSubmit()
})
// <!-- Requirements:
// The user must be able to search for parks in one or more states.
// The user must be able to set the max number of results, with a default of 10.
// The search must trigger a call to NPS's API.
// The parks in the given state must be displayed on the page. Include at least:
// Full name
// Description
// Website URL
// The user must be able to make multiple searches and see only the results for the current search.
// As a stretch goal, try adding the park's address to the results.

// This exercise should take about an hour to complete. If you're having trouble, attend a Q&A session or reach out on Slack for help. -->