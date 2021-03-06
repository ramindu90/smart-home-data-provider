/*
 * Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// var registerCallBackforPush;

(function() {
    var callbackUpdate;
    /**
     * TODO Need to read hostname,port, and tenantId from providerConfig
     * @param providerConfig
     * @param schema
     */
    registerCallBackforPush = function(providerConfig, _schema, _callbackUpdate) {
        var tableName = providerConfig['tableName'];
        var hostname = window.parent.location.hostname;
        var port = window.parent.location.port;
        var encodedQuery = window.parent.location.search.substring(1);
        var schema = toVizGrammarSchema(_schema);
        subscribe(encodedQuery, tableName, onDataUpdate, onError, hostname, port, providerConfig, schema);
        callbackUpdate = _callbackUpdate;
    };

    function onDataUpdate(data) {
        callbackUpdate(data);
    };

    function onError(error) {
        console.error(error);
    };

}());
