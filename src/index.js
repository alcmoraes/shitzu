/*
 * 2018
 * 
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * 
 * @author Alexandre Moraes | github.com/alcmoraes
 * @flow
 */

const Modes = {
  'cors': 'cors',
  'no-cors': 'no-cors',
  'same-origin': 'same-origin'
};

class Api {

    endpoint: string;
    mode: $Keys<typeof Modes>;
    headers: Object;

    constructor(){

      this.endpoint = '';
      this.mode = 'no-cors';

      this.headers = {
        'Accept': 'application/json'
      };

    }

    getMode(): string {
      return this.mode;
    }

    setMode( mode: $Keys<typeof Modes> ): void {
      this.mode = mode;
    }

    getEndpoint(): string {
      return this.endpoint;
    }

    /**
     *
     * @param {string} endpoint Sets the endpoint to fetch
     */
    setEndpoint( endpoint: string ): void {
      this.endpoint = endpoint;
      return;
    }

    getHeaders(): Object {
      return this.headers;
    }

    /**
     *
     * @param {Object} headers The headers to set
     * @param {boolean} replace True if want to replace the current headers
     * @return {void}
     */
    setHeaders( headers: Object, replace?: boolean = false ): void {
      this.headers = replace ? headers : Object.assign( {}, this.headers, headers );
      return;
    }

    /**
     *
     * @param {string} header The header to drop
     * @return {void}
     */
    dropHeader( header: string ): void {
      delete this.headers[ header ];
      return;
    }
    
    /**
     *
     * @param {string} url The url to fetch
     * @param {string} base Replaces the default endpoint
     * @return {Promise} A promise with the data parsed as json
     */
    get( url: string, base?: ?string = null ): Promise<any> {
      return new Promise( async ( resolve, reject ) => {
        try {
          let data = await fetch( ( base || this.endpoint ) + url, {
            method: 'GET',
            headers: new Headers( this.headers ),
            mode: this.mode,
            cache: 'default'
          } );
          resolve( data.json() );
        }
        catch ( ERR ) {
          reject( ERR );
        }
      } );
    }
    
    /**
     *
     * @param {string} url The url to fetch
     * @param {string} base Replaces the default endpoint
     * @return {Promise} A promise with the data parsed as json
     */
    delete( url: string, base?: ?string = null ): Promise<any> {
      return new Promise( async ( resolve, reject ) => {
        try {
          let data = await fetch( ( base || this.endpoint ) + url, {
            method: 'DELETE',
            headers: new Headers( this.headers ),
            mode: this.mode,
            cache: 'default'
          } );
          resolve( data.json() );
        }
        catch ( ERR ) {
          reject( ERR );
        }
      } );
    }
    
    /**
     *
     * @param {string} url The url to fetch
     * @param {Object} body The content to put
     * @param {string} base Replaces the default endpoint
     * @return {Promise} A promise with the data parsed as json
     */
    put( url: string, body: Object, base?: ?string = null ): Promise<any> {
      return new Promise( async ( resolve, reject ) => {
        try {
          let data = await fetch( ( base || this.endpoint ) + url, {
            method: 'PUT',
            headers: new Headers( this.headers ),
            body: JSON.stringify( body ),
            mode: this.mode,
            cache: 'default'
          } );
          resolve( data.json() );
        }
        catch ( ERR ) {
          reject( ERR );
        }
      } );
    }
    
    /**
     *
     * @param {string} url The url to fetch
     * @param {Object} body The content to post
     * @param {string} base Replaces the default endpoint
     * @return {Promise} A promise with the data parsed as json
     */
    post( url: string, body: Object, base?: ?string = null ): Promise<any> {
      return new Promise( async ( resolve, reject ) => {
        let data;
        try {
          data = await fetch( ( base || this.endpoint ) + url, {
            method: 'POST',
            headers: new Headers( this.headers ),
            body: JSON.stringify( body ),
            mode: this.mode,
            cache: 'default'
          } );
          resolve( data.json() );
        }
        catch ( ERR ) {
          reject( ERR );
        }
      } );
    }

}

export default new Api();