"use strict"

var Spotify = require('spotify-web-api-node');
var s = new Spotify();  
const search_artist = "JAY-Z"
let HashMap = require('hashmap');
let ArtistNode = require('./ArtistNode');
const fs = require('fs');
var artist_queue = [];
let found_artists = new HashMap();
let found_artist_node;

const fileName = '..\\spotify-app\\spotify-app\\src\\data.js'
 
var data = [{x:[0,1,2], y:[3,2,1], type: 'bar'}];
var graphOptions = {fileopt : "extend", filename : "nodenodenode"};
 


var spotifyApi = new Spotify({
    clientId: '8b39663dd7b9427aacb87571916e0a49',
    clientSecret: 'b54662692eb34e3fab8377750298f670',
  });



  function checkFound(artist_name){

    if(found_artists.get(artist_name) == 1){
        return 1;
    }
    return 0

  }


  async function searchHelper(start_artist, search_artist){

      let data = await spotifyApi.getArtistRelatedArtists(start_artist.id).catch(e => console.log(e));

      for(let artist in data.body.artists){

          //add to hashmap
          let name = data.body.artists[artist].name;
          
          if(checkFound(name)){
              continue;
            }else{
                let id = data.body.artists[artist].uri.substring(15);
                let newNode = new ArtistNode(start_artist, id ,name, start_artist.depth+1)
                fs.appendFileSync(fileName, newNode.toString(0) );
                
                
                
                found_artists.set(name, 1);
                
                
                if( name === search_artist){
                    console.log('found him')
                return newNode;
            }

                artist_queue.push(newNode);
            continue
        }


    }
    return null;


  }


  async function searchArtist(start_id, search_artist){
   
    fs.writeFileSync(fileName, 'export const data = [')
    let creds = await spotifyApi.clientCredentialsGrant()
    spotifyApi.setAccessToken(creds.body['access_token']);

    let start_artist = new ArtistNode(null, start_id, "Kanye West", 0 );
    fs.appendFileSync(fileName, start_artist.toString(1) );

    artist_queue.push(start_artist);

    let found = null;

    let x = 0
        while(found==null){
         console.log(x);
         x++;
            found = await searchHelper(artist_queue.shift(), search_artist)
        }

        
        let next = found;
        while(next.previous != null){
           fs.appendFileSync(fileName, `{ data: { source: '${next.id}', target: '${next.previous.id}', label: 'trace' } },`)
            next = next.previous
        }
        fs.appendFileSync(fileName, ']');
  }


  searchArtist('5K4W6rqBFWDnAN6FQUkS6x', 'OSHUN')