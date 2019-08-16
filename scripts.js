'use strict'

function formSubmit(){
    $('form').on('submit', function(event){
        event.preventDefault();
        
        let states = $('.state_name').val().toLowerCase().replace(/,/g, '').split(' ');
        let resultNum= $('.result_number').val();
        $('.resultsContainer').html('<h2>Results:</h2>')
        queryParameters(states, resultNum);
    })
}

function queryParameters(input1, input2){
    let stateParam= `stateCode=${input1[0]}`
    let numParam= `&limit=${input2}`
        if(input1.length > 1){
         for(let i=1; i< input1.length; i++){
             stateParam = stateParam.concat(`&stateCode=${input1[i]}`)
        }
        let query = (stateParam + numParam);
        getParks(query);
    }   
    else {let query= stateParam + numParam;
    getParks(query);
    }
  
}

function generateResults(input){
    console.log(input);
    if(input.data.length === 0){
        searchFail();
    }
    else{for(let i = 0; i < input.data.length; i++){
        $('.resultsContainer').append(
            `<ul>
                <li>Name: ${input.data[i].fullName}</li>
                <li>Description: ${input.data[i].description}</li>
                <li>Website: <a href=${input.data[i].url} target="_blank">${input.data[i].url}</a></li>
                <li>Directions: <a href=${input.data[i].directionsUrl} target="_blank">${input.data[i].directionsUrl}</a></li>
            </ul>
            <hr>`)
    }}
    

}

function getParks(input){
    fetch(`https://developer.nps.gov/api/v1/parks?${input}&api_key=llbLd1Z24A7KuDmg212TbdX9owXIXTcva4D3w9y5`)
    .then(response => {
        if (response.ok){
          return response;
          }
          else{
            searchFail();
          }
      })
    .then(response => response.json())
    .then(responseJson => generateResults(responseJson));
}

function searchFail(){
  
    $('.resultsContainer').html('<h1>Sorry, but it looks like we were unable to find any results for you.</h1')
  }

function runApp(){
    formSubmit();
    
}

$(runApp);