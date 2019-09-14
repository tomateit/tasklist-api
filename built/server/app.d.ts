import express = require("express");
export default class AppServer {
    static bootstrap(): AppServer;
    app: express.Application;
    private model;
    constructor();
    config(): void;
    api(): void;
    /**
     * Create router.
     *
     * @class Server
     * @method config
     * @return void
     */
    private routes;
}
