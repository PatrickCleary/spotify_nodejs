"use strict"
 class ArtistNode{

    constructor(previous_artist, artist_id, artist_name, depth){
        this.previous= previous_artist;
        this.id = artist_id;
        this.name = artist_name;
        this.depth = depth;
    }

    toString(num ){
        if(num == 0){
        return (`{ data: { id: '${this.id}', label: \`${this.name}\`, weight: '${this.depth}' } },
        { data: { source: '${this.id}', target: '${this.previous.id}', label: 'this is an edge label' } },`)
        }else{
        return (`{ data: { id: '${this.id}', label: '${this.name}', weight: '${this.depth}' } },`)
        }
    }
}

module.exports = ArtistNode;