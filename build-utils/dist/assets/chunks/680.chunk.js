"use strict";
(self["webpackChunkinterface_white_blue_swaps"] = self["webpackChunkinterface_white_blue_swaps"] || []).push([[680],{

/***/ 1074:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFAULT_BASE_URL = void 0;
exports.DEFAULT_BASE_URL = 'https://safe-client.safe.global';
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 76287:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEndpoint = exports.deleteEndpoint = exports.putEndpoint = exports.postEndpoint = void 0;
const utils_1 = __webpack_require__(59136);
function makeUrl(baseUrl, path, pathParams, query) {
    const pathname = (0, utils_1.insertParams)(path, pathParams);
    const search = (0, utils_1.stringifyQuery)(query);
    return `${baseUrl}${pathname}${search}`;
}
function postEndpoint(baseUrl, path, params) {
    const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
    return (0, utils_1.fetchData)(url, 'POST', params === null || params === void 0 ? void 0 : params.body, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
}
exports.postEndpoint = postEndpoint;
function putEndpoint(baseUrl, path, params) {
    const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
    return (0, utils_1.fetchData)(url, 'PUT', params === null || params === void 0 ? void 0 : params.body, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
}
exports.putEndpoint = putEndpoint;
function deleteEndpoint(baseUrl, path, params) {
    const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
    return (0, utils_1.fetchData)(url, 'DELETE', params === null || params === void 0 ? void 0 : params.body, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
}
exports.deleteEndpoint = deleteEndpoint;
function getEndpoint(baseUrl, path, params, rawUrl) {
    if (rawUrl) {
        return (0, utils_1.getData)(rawUrl, undefined, params === null || params === void 0 ? void 0 : params.credentials);
    }
    const url = makeUrl(baseUrl, path, params === null || params === void 0 ? void 0 : params.path, params === null || params === void 0 ? void 0 : params.query);
    return (0, utils_1.getData)(url, params === null || params === void 0 ? void 0 : params.headers, params === null || params === void 0 ? void 0 : params.credentials);
}
exports.getEndpoint = getEndpoint;
//# sourceMappingURL=endpoint.js.map

/***/ }),

/***/ 18831:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteAccount = exports.getAccount = exports.createAccount = exports.verifyAuth = exports.getAuthNonce = exports.getContract = exports.getSafeOverviews = exports.unsubscribeAll = exports.unsubscribeSingle = exports.registerRecoveryModule = exports.deleteRegisteredEmail = exports.getRegisteredEmail = exports.verifyEmail = exports.resendEmailVerificationCode = exports.changeEmail = exports.registerEmail = exports.unregisterDevice = exports.unregisterSafe = exports.registerDevice = exports.getDelegates = exports.confirmSafeMessage = exports.proposeSafeMessage = exports.getSafeMessage = exports.getSafeMessages = exports.getDecodedData = exports.getMasterCopies = exports.getSafeApps = exports.getChainConfig = exports.getChainsConfig = exports.getConfirmationView = exports.proposeTransaction = exports.getNonces = exports.postSafeGasEstimation = exports.deleteTransaction = exports.getTransactionDetails = exports.getTransactionQueue = exports.getTransactionHistory = exports.getCollectiblesPage = exports.getCollectibles = exports.getAllOwnedSafes = exports.getOwnedSafes = exports.getFiatCurrencies = exports.getBalances = exports.getMultisigTransactions = exports.getModuleTransactions = exports.getIncomingTransfers = exports.getSafeInfo = exports.getRelayCount = exports.relayTransaction = exports.setBaseUrl = void 0;
exports.putAccountDataSettings = exports.getAccountDataSettings = exports.getAccountDataTypes = void 0;
const endpoint_1 = __webpack_require__(76287);
const config_1 = __webpack_require__(1074);
__exportStar(__webpack_require__(32733), exports);
__exportStar(__webpack_require__(22394), exports);
__exportStar(__webpack_require__(17584), exports);
__exportStar(__webpack_require__(28996), exports);
__exportStar(__webpack_require__(23075), exports);
__exportStar(__webpack_require__(80247), exports);
__exportStar(__webpack_require__(83571), exports);
__exportStar(__webpack_require__(43150), exports);
__exportStar(__webpack_require__(50379), exports);
__exportStar(__webpack_require__(88553), exports);
// Can be set externally to a different CGW host
let baseUrl = config_1.DEFAULT_BASE_URL;
/**
 * Set the base CGW URL
 */
const setBaseUrl = (url) => {
    baseUrl = url;
};
exports.setBaseUrl = setBaseUrl;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * Relay a transaction from a Safe
 */
function relayTransaction(chainId, body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/relay', { path: { chainId }, body });
}
exports.relayTransaction = relayTransaction;
/**
 * Get the relay limit and number of remaining relays remaining
 */
function getRelayCount(chainId, address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/relay/{address}', { path: { chainId, address } });
}
exports.getRelayCount = getRelayCount;
/**
 * Get basic information about a Safe. E.g. owners, modules, version etc
 */
function getSafeInfo(chainId, address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{address}', { path: { chainId, address } });
}
exports.getSafeInfo = getSafeInfo;
/**
 * Get filterable list of incoming transactions
 */
function getIncomingTransfers(chainId, address, query, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{address}/incoming-transfers/', {
        path: { chainId, address },
        query,
    }, pageUrl);
}
exports.getIncomingTransfers = getIncomingTransfers;
/**
 * Get filterable list of module transactions
 */
function getModuleTransactions(chainId, address, query, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{address}/module-transactions/', {
        path: { chainId, address },
        query,
    }, pageUrl);
}
exports.getModuleTransactions = getModuleTransactions;
/**
 * Get filterable list of multisig transactions
 */
function getMultisigTransactions(chainId, address, query, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{address}/multisig-transactions/', {
        path: { chainId, address },
        query,
    }, pageUrl);
}
exports.getMultisigTransactions = getMultisigTransactions;
/**
 * Get the total balance and all assets stored in a Safe
 */
function getBalances(chainId, address, currency = 'usd', query = {}) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{address}/balances/{currency}', {
        path: { chainId, address, currency },
        query,
    });
}
exports.getBalances = getBalances;
/**
 * Get a list of supported fiat currencies (e.g. USD, EUR etc)
 */
function getFiatCurrencies() {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/balances/supported-fiat-codes');
}
exports.getFiatCurrencies = getFiatCurrencies;
/**
 * Get the addresses of all Safes belonging to an owner
 */
function getOwnedSafes(chainId, address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/owners/{address}/safes', { path: { chainId, address } });
}
exports.getOwnedSafes = getOwnedSafes;
/**
 * Get the addresses of all Safes belonging to an owner on all chains
 */
function getAllOwnedSafes(address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/owners/{address}/safes', { path: { address } });
}
exports.getAllOwnedSafes = getAllOwnedSafes;
/**
 * Get NFTs stored in a Safe
 */
function getCollectibles(chainId, address, query = {}) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{address}/collectibles', {
        path: { chainId, address },
        query,
    });
}
exports.getCollectibles = getCollectibles;
/**
 * Get NFTs stored in a Safe
 */
function getCollectiblesPage(chainId, address, query = {}, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v2/chains/{chainId}/safes/{address}/collectibles', { path: { chainId, address }, query }, pageUrl);
}
exports.getCollectiblesPage = getCollectiblesPage;
/**
 * Get a list of past Safe transactions
 */
function getTransactionHistory(chainId, address, query = {}, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/transactions/history', { path: { chainId, safe_address: address }, query }, pageUrl);
}
exports.getTransactionHistory = getTransactionHistory;
/**
 * Get the list of pending transactions
 */
function getTransactionQueue(chainId, address, query = {}, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/transactions/queued', { path: { chainId, safe_address: address }, query }, pageUrl);
}
exports.getTransactionQueue = getTransactionQueue;
/**
 * Get the details of an individual transaction by its id
 */
function getTransactionDetails(chainId, transactionId) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/transactions/{transactionId}', {
        path: { chainId, transactionId },
    });
}
exports.getTransactionDetails = getTransactionDetails;
/**
 * Delete a transaction by its safeTxHash
 */
function deleteTransaction(chainId, safeTxHash, signature) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, '/v1/chains/{chainId}/transactions/{safeTxHash}', {
        path: { chainId, safeTxHash },
        body: { signature },
    });
}
exports.deleteTransaction = deleteTransaction;
/**
 * Request a gas estimate & recommmended tx nonce for a created transaction
 */
function postSafeGasEstimation(chainId, address, body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v2/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations', {
        path: { chainId, safe_address: address },
        body,
    });
}
exports.postSafeGasEstimation = postSafeGasEstimation;
function getNonces(chainId, address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/nonces', {
        path: { chainId, safe_address: address },
    });
}
exports.getNonces = getNonces;
/**
 * Propose a new transaction for other owners to sign/execute
 */
function proposeTransaction(chainId, address, body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/transactions/{safe_address}/propose', {
        path: { chainId, safe_address: address },
        body,
    });
}
exports.proposeTransaction = proposeTransaction;
/**
 * Returns decoded data
 */
function getConfirmationView(chainId, safeAddress, encodedData, to) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/views/transaction-confirmation', {
        path: { chainId: chainId, safe_address: safeAddress },
        body: { data: encodedData, to },
    });
}
exports.getConfirmationView = getConfirmationView;
/**
 * Returns all defined chain configs
 */
function getChainsConfig(query) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains', {
        query,
    });
}
exports.getChainsConfig = getChainsConfig;
/**
 * Returns a chain config
 */
function getChainConfig(chainId) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}', {
        path: { chainId: chainId },
    });
}
exports.getChainConfig = getChainConfig;
/**
 * Returns Safe Apps List
 */
function getSafeApps(chainId, query = {}) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safe-apps', {
        path: { chainId: chainId },
        query,
    });
}
exports.getSafeApps = getSafeApps;
/**
 * Returns list of Master Copies
 */
function getMasterCopies(chainId) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/about/master-copies', {
        path: { chainId: chainId },
    });
}
exports.getMasterCopies = getMasterCopies;
/**
 * Returns decoded data
 */
function getDecodedData(chainId, encodedData, to) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/data-decoder', {
        path: { chainId: chainId },
        body: { data: encodedData, to },
    });
}
exports.getDecodedData = getDecodedData;
/**
 * Returns list of `SafeMessage`s
 */
function getSafeMessages(chainId, address, pageUrl) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/messages', { path: { chainId, safe_address: address }, query: {} }, pageUrl);
}
exports.getSafeMessages = getSafeMessages;
/**
 * Returns a `SafeMessage`
 */
function getSafeMessage(chainId, messageHash) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/messages/{message_hash}', {
        path: { chainId, message_hash: messageHash },
    });
}
exports.getSafeMessage = getSafeMessage;
/**
 * Propose a new `SafeMessage` for other owners to sign
 */
function proposeSafeMessage(chainId, address, body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/messages', {
        path: { chainId, safe_address: address },
        body,
    });
}
exports.proposeSafeMessage = proposeSafeMessage;
/**
 * Add a confirmation to a `SafeMessage`
 */
function confirmSafeMessage(chainId, messageHash, body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/messages/{message_hash}/signatures', {
        path: { chainId, message_hash: messageHash },
        body,
    });
}
exports.confirmSafeMessage = confirmSafeMessage;
/**
 * Returns a list of delegates
 */
function getDelegates(chainId, query = {}) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v2/chains/{chainId}/delegates', {
        path: { chainId },
        query,
    });
}
exports.getDelegates = getDelegates;
/**
 * Registers a device/Safe for notifications
 */
function registerDevice(body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/register/notifications', {
        body,
    });
}
exports.registerDevice = registerDevice;
/**
 * Unregisters a Safe from notifications
 */
function unregisterSafe(chainId, address, uuid) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, '/v1/chains/{chainId}/notifications/devices/{uuid}/safes/{safe_address}', {
        path: { chainId, safe_address: address, uuid },
    });
}
exports.unregisterSafe = unregisterSafe;
/**
 * Unregisters a device from notifications
 */
function unregisterDevice(chainId, uuid) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, '/v1/chains/{chainId}/notifications/devices/{uuid}', {
        path: { chainId, uuid },
    });
}
exports.unregisterDevice = unregisterDevice;
/**
 * Registers a email address for a safe signer.
 *
 * The signer wallet has to sign a message of format: `email-register-{chainId}-{safeAddress}-{emailAddress}-{signer}-{timestamp}`
 * The signature is valid for 5 minutes.
 *
 * @param chainId
 * @param safeAddress
 * @param body Signer address and email address
 * @param headers Signature and Signature timestamp
 * @returns 200 if signature matches the data
 */
function registerEmail(chainId, safeAddress, body, headers) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/emails', {
        path: { chainId, safe_address: safeAddress },
        body,
        headers,
    });
}
exports.registerEmail = registerEmail;
/**
 * Changes an already registered email address for a safe signer. The new email address still needs to be verified.
 *
 * The signer wallet has to sign a message of format: `email-edit-{chainId}-{safeAddress}-{emailAddress}-{signer}-{timestamp}`
 * The signature is valid for 5 minutes.
 *
 * @param chainId
 * @param safeAddress
 * @param signerAddress
 * @param body New email address
 * @param headers Signature and Signature timestamp
 * @returns 202 if signature matches the data
 */
function changeEmail(chainId, safeAddress, signerAddress, body, headers) {
    return (0, endpoint_1.putEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}', {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        body,
        headers,
    });
}
exports.changeEmail = changeEmail;
/**
 * Resends an email verification code.
 */
function resendEmailVerificationCode(chainId, safeAddress, signerAddress) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify-resend', {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        body: '',
    });
}
exports.resendEmailVerificationCode = resendEmailVerificationCode;
/**
 * Verifies a pending email address registration.
 *
 * @param chainId
 * @param safeAddress
 * @param signerAddress address who signed the email registration
 * @param body Verification code
 */
function verifyEmail(chainId, safeAddress, signerAddress, body) {
    return (0, endpoint_1.putEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}/verify', {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        body,
    });
}
exports.verifyEmail = verifyEmail;
/**
 * Gets the registered email address of the signer
 *
 * The signer wallet will have to sign a message of format: `email-retrieval-{chainId}-{safe}-{signer}-{timestamp}`
 * The signature is valid for 5 minutes.
 *
 * @param chainId
 * @param safeAddress
 * @param signerAddress address of the owner of the Safe
 *
 * @returns email address and verified flag
 */
function getRegisteredEmail(chainId, safeAddress, signerAddress, headers) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}', {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        headers,
    });
}
exports.getRegisteredEmail = getRegisteredEmail;
/**
 * Delete a registered email address for the signer
 *
 * The signer wallet will have to sign a message of format: `email-delete-{chainId}-{safe}-{signer}-{timestamp}`
 * The signature is valid for 5 minutes.
 *
 * @param chainId
 * @param safeAddress
 * @param signerAddress
 * @param headers
 */
function deleteRegisteredEmail(chainId, safeAddress, signerAddress, headers) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/emails/{signer}', {
        path: { chainId, safe_address: safeAddress, signer: signerAddress },
        headers,
    });
}
exports.deleteRegisteredEmail = deleteRegisteredEmail;
/**
 * Register a recovery module for receiving alerts
 * @param chainId
 * @param safeAddress
 * @param body - { moduleAddress: string }
 */
function registerRecoveryModule(chainId, safeAddress, body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/chains/{chainId}/safes/{safe_address}/recovery', {
        path: { chainId, safe_address: safeAddress },
        body,
    });
}
exports.registerRecoveryModule = registerRecoveryModule;
/**
 * Delete email subscription for a single category
 * @param query
 */
function unsubscribeSingle(query) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, '/v1/subscriptions', { query });
}
exports.unsubscribeSingle = unsubscribeSingle;
/**
 * Delete email subscription for all categories
 * @param query
 */
function unsubscribeAll(query) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, '/v1/subscriptions/all', { query });
}
exports.unsubscribeAll = unsubscribeAll;
/**
 * Get Safe overviews per address
 */
function getSafeOverviews(safes, query) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/safes', {
        query: Object.assign(Object.assign({}, query), { safes: safes.join(',') }),
    });
}
exports.getSafeOverviews = getSafeOverviews;
function getContract(chainId, contractAddress) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/chains/{chainId}/contracts/{contractAddress}', {
        path: {
            chainId: chainId,
            contractAddress: contractAddress,
        },
    });
}
exports.getContract = getContract;
function getAuthNonce() {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/auth/nonce', { credentials: 'include' });
}
exports.getAuthNonce = getAuthNonce;
function verifyAuth(body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/auth/verify', {
        body,
        credentials: 'include',
    });
}
exports.verifyAuth = verifyAuth;
function createAccount(body) {
    return (0, endpoint_1.postEndpoint)(baseUrl, '/v1/accounts', {
        body,
        credentials: 'include',
    });
}
exports.createAccount = createAccount;
function getAccount(address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/accounts/{address}', {
        path: { address },
        credentials: 'include',
    });
}
exports.getAccount = getAccount;
function deleteAccount(address) {
    return (0, endpoint_1.deleteEndpoint)(baseUrl, '/v1/accounts/{address}', {
        path: { address },
        credentials: 'include',
    });
}
exports.deleteAccount = deleteAccount;
function getAccountDataTypes() {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/accounts/data-types');
}
exports.getAccountDataTypes = getAccountDataTypes;
function getAccountDataSettings(address) {
    return (0, endpoint_1.getEndpoint)(baseUrl, '/v1/accounts/{address}/data-settings', {
        path: { address },
        credentials: 'include',
    });
}
exports.getAccountDataSettings = getAccountDataSettings;
function putAccountDataSettings(address, body) {
    return (0, endpoint_1.putEndpoint)(baseUrl, '/v1/accounts/{address}/data-settings', {
        path: { address },
        body,
        credentials: 'include',
    });
}
exports.putAccountDataSettings = putAccountDataSettings;
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 28996:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FEATURES = exports.GAS_PRICE_TYPE = exports.RPC_AUTHENTICATION = void 0;
var RPC_AUTHENTICATION;
(function (RPC_AUTHENTICATION) {
    RPC_AUTHENTICATION["API_KEY_PATH"] = "API_KEY_PATH";
    RPC_AUTHENTICATION["NO_AUTHENTICATION"] = "NO_AUTHENTICATION";
    RPC_AUTHENTICATION["UNKNOWN"] = "UNKNOWN";
})(RPC_AUTHENTICATION = exports.RPC_AUTHENTICATION || (exports.RPC_AUTHENTICATION = {}));
var GAS_PRICE_TYPE;
(function (GAS_PRICE_TYPE) {
    GAS_PRICE_TYPE["ORACLE"] = "ORACLE";
    GAS_PRICE_TYPE["FIXED"] = "FIXED";
    GAS_PRICE_TYPE["FIXED_1559"] = "FIXED1559";
    GAS_PRICE_TYPE["UNKNOWN"] = "UNKNOWN";
})(GAS_PRICE_TYPE = exports.GAS_PRICE_TYPE || (exports.GAS_PRICE_TYPE = {}));
var FEATURES;
(function (FEATURES) {
    FEATURES["ERC721"] = "ERC721";
    FEATURES["SAFE_APPS"] = "SAFE_APPS";
    FEATURES["CONTRACT_INTERACTION"] = "CONTRACT_INTERACTION";
    FEATURES["DOMAIN_LOOKUP"] = "DOMAIN_LOOKUP";
    FEATURES["SPENDING_LIMIT"] = "SPENDING_LIMIT";
    FEATURES["EIP1559"] = "EIP1559";
    FEATURES["SAFE_TX_GAS_OPTIONAL"] = "SAFE_TX_GAS_OPTIONAL";
    FEATURES["TX_SIMULATION"] = "TX_SIMULATION";
    FEATURES["EIP1271"] = "EIP1271";
})(FEATURES = exports.FEATURES || (exports.FEATURES = {}));
//# sourceMappingURL=chains.js.map

/***/ }),

/***/ 23075:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    TokenType["ERC20"] = "ERC20";
    TokenType["ERC721"] = "ERC721";
    TokenType["NATIVE_TOKEN"] = "NATIVE_TOKEN";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
//# sourceMappingURL=common.js.map

/***/ }),

/***/ 83571:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfirmationViewTypes = void 0;
var ConfirmationViewTypes;
(function (ConfirmationViewTypes) {
    ConfirmationViewTypes["COW_SWAP_ORDER"] = "COW_SWAP_ORDER";
    ConfirmationViewTypes["COW_SWAP_TWAP_ORDER"] = "COW_SWAP_TWAP_ORDER";
})(ConfirmationViewTypes = exports.ConfirmationViewTypes || (exports.ConfirmationViewTypes = {}));
//# sourceMappingURL=decoded-data.js.map

/***/ }),

/***/ 80247:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=master-copies.js.map

/***/ }),

/***/ 50379:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeviceType = void 0;
var DeviceType;
(function (DeviceType) {
    DeviceType["ANDROID"] = "ANDROID";
    DeviceType["IOS"] = "IOS";
    DeviceType["WEB"] = "WEB";
})(DeviceType = exports.DeviceType || (exports.DeviceType = {}));
//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 88553:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=relay.js.map

/***/ }),

/***/ 22394:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SafeAppSocialPlatforms = exports.SafeAppFeatures = exports.SafeAppAccessPolicyTypes = void 0;
var SafeAppAccessPolicyTypes;
(function (SafeAppAccessPolicyTypes) {
    SafeAppAccessPolicyTypes["NoRestrictions"] = "NO_RESTRICTIONS";
    SafeAppAccessPolicyTypes["DomainAllowlist"] = "DOMAIN_ALLOWLIST";
})(SafeAppAccessPolicyTypes = exports.SafeAppAccessPolicyTypes || (exports.SafeAppAccessPolicyTypes = {}));
var SafeAppFeatures;
(function (SafeAppFeatures) {
    SafeAppFeatures["BATCHED_TRANSACTIONS"] = "BATCHED_TRANSACTIONS";
})(SafeAppFeatures = exports.SafeAppFeatures || (exports.SafeAppFeatures = {}));
var SafeAppSocialPlatforms;
(function (SafeAppSocialPlatforms) {
    SafeAppSocialPlatforms["TWITTER"] = "TWITTER";
    SafeAppSocialPlatforms["GITHUB"] = "GITHUB";
    SafeAppSocialPlatforms["DISCORD"] = "DISCORD";
})(SafeAppSocialPlatforms = exports.SafeAppSocialPlatforms || (exports.SafeAppSocialPlatforms = {}));
//# sourceMappingURL=safe-apps.js.map

/***/ }),

/***/ 32733:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImplementationVersionState = void 0;
var ImplementationVersionState;
(function (ImplementationVersionState) {
    ImplementationVersionState["UP_TO_DATE"] = "UP_TO_DATE";
    ImplementationVersionState["OUTDATED"] = "OUTDATED";
    ImplementationVersionState["UNKNOWN"] = "UNKNOWN";
})(ImplementationVersionState = exports.ImplementationVersionState || (exports.ImplementationVersionState = {}));
//# sourceMappingURL=safe-info.js.map

/***/ }),

/***/ 43150:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SafeMessageStatus = exports.SafeMessageListItemType = void 0;
var SafeMessageListItemType;
(function (SafeMessageListItemType) {
    SafeMessageListItemType["DATE_LABEL"] = "DATE_LABEL";
    SafeMessageListItemType["MESSAGE"] = "MESSAGE";
})(SafeMessageListItemType = exports.SafeMessageListItemType || (exports.SafeMessageListItemType = {}));
var SafeMessageStatus;
(function (SafeMessageStatus) {
    SafeMessageStatus["NEEDS_CONFIRMATION"] = "NEEDS_CONFIRMATION";
    SafeMessageStatus["CONFIRMED"] = "CONFIRMED";
})(SafeMessageStatus = exports.SafeMessageStatus || (exports.SafeMessageStatus = {}));
//# sourceMappingURL=safe-messages.js.map

/***/ }),

/***/ 17584:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LabelValue = exports.StartTimeValue = exports.DurationType = exports.DetailedExecutionInfoType = exports.TransactionListItemType = exports.ConflictType = exports.TransactionInfoType = exports.SettingsInfoType = exports.TransactionTokenType = exports.TransferDirection = exports.TransactionStatus = exports.Operation = void 0;
var Operation;
(function (Operation) {
    Operation[Operation["CALL"] = 0] = "CALL";
    Operation[Operation["DELEGATE"] = 1] = "DELEGATE";
})(Operation = exports.Operation || (exports.Operation = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["AWAITING_CONFIRMATIONS"] = "AWAITING_CONFIRMATIONS";
    TransactionStatus["AWAITING_EXECUTION"] = "AWAITING_EXECUTION";
    TransactionStatus["CANCELLED"] = "CANCELLED";
    TransactionStatus["FAILED"] = "FAILED";
    TransactionStatus["SUCCESS"] = "SUCCESS";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
var TransferDirection;
(function (TransferDirection) {
    TransferDirection["INCOMING"] = "INCOMING";
    TransferDirection["OUTGOING"] = "OUTGOING";
    TransferDirection["UNKNOWN"] = "UNKNOWN";
})(TransferDirection = exports.TransferDirection || (exports.TransferDirection = {}));
var TransactionTokenType;
(function (TransactionTokenType) {
    TransactionTokenType["ERC20"] = "ERC20";
    TransactionTokenType["ERC721"] = "ERC721";
    TransactionTokenType["NATIVE_COIN"] = "NATIVE_COIN";
})(TransactionTokenType = exports.TransactionTokenType || (exports.TransactionTokenType = {}));
var SettingsInfoType;
(function (SettingsInfoType) {
    SettingsInfoType["SET_FALLBACK_HANDLER"] = "SET_FALLBACK_HANDLER";
    SettingsInfoType["ADD_OWNER"] = "ADD_OWNER";
    SettingsInfoType["REMOVE_OWNER"] = "REMOVE_OWNER";
    SettingsInfoType["SWAP_OWNER"] = "SWAP_OWNER";
    SettingsInfoType["CHANGE_THRESHOLD"] = "CHANGE_THRESHOLD";
    SettingsInfoType["CHANGE_IMPLEMENTATION"] = "CHANGE_IMPLEMENTATION";
    SettingsInfoType["ENABLE_MODULE"] = "ENABLE_MODULE";
    SettingsInfoType["DISABLE_MODULE"] = "DISABLE_MODULE";
    SettingsInfoType["SET_GUARD"] = "SET_GUARD";
    SettingsInfoType["DELETE_GUARD"] = "DELETE_GUARD";
})(SettingsInfoType = exports.SettingsInfoType || (exports.SettingsInfoType = {}));
var TransactionInfoType;
(function (TransactionInfoType) {
    TransactionInfoType["TRANSFER"] = "Transfer";
    TransactionInfoType["SETTINGS_CHANGE"] = "SettingsChange";
    TransactionInfoType["CUSTOM"] = "Custom";
    TransactionInfoType["CREATION"] = "Creation";
    TransactionInfoType["SWAP_ORDER"] = "SwapOrder";
    TransactionInfoType["TWAP_ORDER"] = "TwapOrder";
    TransactionInfoType["SWAP_TRANSFER"] = "SwapTransfer";
})(TransactionInfoType = exports.TransactionInfoType || (exports.TransactionInfoType = {}));
var ConflictType;
(function (ConflictType) {
    ConflictType["NONE"] = "None";
    ConflictType["HAS_NEXT"] = "HasNext";
    ConflictType["END"] = "End";
})(ConflictType = exports.ConflictType || (exports.ConflictType = {}));
var TransactionListItemType;
(function (TransactionListItemType) {
    TransactionListItemType["TRANSACTION"] = "TRANSACTION";
    TransactionListItemType["LABEL"] = "LABEL";
    TransactionListItemType["CONFLICT_HEADER"] = "CONFLICT_HEADER";
    TransactionListItemType["DATE_LABEL"] = "DATE_LABEL";
})(TransactionListItemType = exports.TransactionListItemType || (exports.TransactionListItemType = {}));
var DetailedExecutionInfoType;
(function (DetailedExecutionInfoType) {
    DetailedExecutionInfoType["MULTISIG"] = "MULTISIG";
    DetailedExecutionInfoType["MODULE"] = "MODULE";
})(DetailedExecutionInfoType = exports.DetailedExecutionInfoType || (exports.DetailedExecutionInfoType = {}));
var DurationType;
(function (DurationType) {
    DurationType["AUTO"] = "AUTO";
    DurationType["LIMIT_DURATION"] = "LIMIT_DURATION";
})(DurationType = exports.DurationType || (exports.DurationType = {}));
var StartTimeValue;
(function (StartTimeValue) {
    StartTimeValue["AT_MINING_TIME"] = "AT_MINING_TIME";
    StartTimeValue["AT_EPOCH"] = "AT_EPOCH";
})(StartTimeValue = exports.StartTimeValue || (exports.StartTimeValue = {}));
var LabelValue;
(function (LabelValue) {
    LabelValue["Queued"] = "Queued";
    LabelValue["Next"] = "Next";
})(LabelValue = exports.LabelValue || (exports.LabelValue = {}));
//# sourceMappingURL=transactions.js.map

/***/ }),

/***/ 59136:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getData = exports.fetchData = exports.stringifyQuery = exports.insertParams = void 0;
const isErrorResponse = (data) => {
    const isObject = typeof data === 'object' && data !== null;
    return isObject && 'code' in data && 'message' in data;
};
function replaceParam(str, key, value) {
    return str.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
}
function insertParams(template, params) {
    return params
        ? Object.keys(params).reduce((result, key) => {
            return replaceParam(result, key, String(params[key]));
        }, template)
        : template;
}
exports.insertParams = insertParams;
function stringifyQuery(query) {
    if (!query) {
        return '';
    }
    const searchParams = new URLSearchParams();
    Object.keys(query).forEach((key) => {
        if (query[key] != null) {
            searchParams.append(key, String(query[key]));
        }
    });
    const searchString = searchParams.toString();
    return searchString ? `?${searchString}` : '';
}
exports.stringifyQuery = stringifyQuery;
function parseResponse(resp) {
    return __awaiter(this, void 0, void 0, function* () {
        let json;
        try {
            json = yield resp.json();
        }
        catch (_a) {
            json = {};
        }
        if (!resp.ok) {
            const errTxt = isErrorResponse(json)
                ? `CGW error - ${json.code}: ${json.message}`
                : `CGW error - status ${resp.statusText}`;
            throw new Error(errTxt);
        }
        return json;
    });
}
function fetchData(url, method, body, headers, credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestHeaders = Object.assign({ 'Content-Type': 'application/json' }, headers);
        const options = {
            method: method !== null && method !== void 0 ? method : 'POST',
            headers: requestHeaders,
        };
        if (credentials) {
            options['credentials'] = credentials;
        }
        if (body != null) {
            options.body = typeof body === 'string' ? body : JSON.stringify(body);
        }
        const resp = yield fetch(url, options);
        return parseResponse(resp);
    });
}
exports.fetchData = fetchData;
function getData(url, headers, credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: 'GET',
        };
        if (headers) {
            options['headers'] = Object.assign(Object.assign({}, headers), { 'Content-Type': 'application/json' });
        }
        if (credentials) {
            options['credentials'] = credentials;
        }
        const resp = yield fetch(url, options);
        return parseResponse(resp);
    });
}
exports.getData = getData;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 48680:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "MessageFormatter": function() { return /* reexport */ MessageFormatter; },
  "Methods": function() { return /* reexport */ Methods; },
  "Operation": function() { return /* reexport */ dist.Operation; },
  "RPC_CALLS": function() { return /* reexport */ RPC_CALLS; },
  "RestrictedMethods": function() { return /* reexport */ RestrictedMethods; },
  "TokenType": function() { return /* reexport */ dist.TokenType; },
  "TransactionStatus": function() { return /* reexport */ dist.TransactionStatus; },
  "TransferDirection": function() { return /* reexport */ dist.TransferDirection; },
  "default": function() { return /* binding */ esm; },
  "getSDKVersion": function() { return /* reexport */ getSDKVersion; },
  "isObjectEIP712TypedData": function() { return /* reexport */ isObjectEIP712TypedData; }
});

;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/version.js
const getSDKVersion = () => '9.1.0';
//# sourceMappingURL=version.js.map
;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/communication/utils.js
// i.e. 0-255 -> '00'-'ff'
const dec2hex = (dec) => dec.toString(16).padStart(2, '0');
const generateId = (len) => {
    const arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
};
const generateRequestId = () => {
    if (typeof window !== 'undefined') {
        return generateId(10);
    }
    return new Date().getTime().toString(36);
};

//# sourceMappingURL=utils.js.map
;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/communication/messageFormatter.js


class MessageFormatter {
}
MessageFormatter.makeRequest = (method, params) => {
    const id = generateRequestId();
    return {
        id,
        method,
        params,
        env: {
            sdkVersion: getSDKVersion(),
        },
    };
};
MessageFormatter.makeResponse = (id, data, version) => ({
    id,
    success: true,
    version,
    data,
});
MessageFormatter.makeErrorResponse = (id, error, version) => ({
    id,
    success: false,
    error,
    version,
});

//# sourceMappingURL=messageFormatter.js.map
;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/communication/methods.js
var Methods;
(function (Methods) {
    Methods["sendTransactions"] = "sendTransactions";
    Methods["rpcCall"] = "rpcCall";
    Methods["getChainInfo"] = "getChainInfo";
    Methods["getSafeInfo"] = "getSafeInfo";
    Methods["getTxBySafeTxHash"] = "getTxBySafeTxHash";
    Methods["getSafeBalances"] = "getSafeBalances";
    Methods["signMessage"] = "signMessage";
    Methods["signTypedMessage"] = "signTypedMessage";
    Methods["getEnvironmentInfo"] = "getEnvironmentInfo";
    Methods["getOffChainSignature"] = "getOffChainSignature";
    Methods["requestAddressBook"] = "requestAddressBook";
    Methods["wallet_getPermissions"] = "wallet_getPermissions";
    Methods["wallet_requestPermissions"] = "wallet_requestPermissions";
})(Methods || (Methods = {}));
var RestrictedMethods;
(function (RestrictedMethods) {
    RestrictedMethods["requestAddressBook"] = "requestAddressBook";
})(RestrictedMethods || (RestrictedMethods = {}));
//# sourceMappingURL=methods.js.map
;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/communication/index.js

class PostMessageCommunicator {
    constructor(allowedOrigins = null, debugMode = false) {
        this.allowedOrigins = null;
        this.callbacks = new Map();
        this.debugMode = false;
        this.isServer = typeof window === 'undefined';
        this.isValidMessage = ({ origin, data, source }) => {
            const emptyOrMalformed = !data;
            const sentFromParentEl = !this.isServer && source === window.parent;
            const majorVersionNumber = typeof data.version !== 'undefined' && parseInt(data.version.split('.')[0]);
            const allowedSDKVersion = typeof majorVersionNumber === 'number' && majorVersionNumber >= 1;
            let validOrigin = true;
            if (Array.isArray(this.allowedOrigins)) {
                validOrigin = this.allowedOrigins.find((regExp) => regExp.test(origin)) !== undefined;
            }
            return !emptyOrMalformed && sentFromParentEl && allowedSDKVersion && validOrigin;
        };
        this.logIncomingMessage = (msg) => {
            console.info(`Safe Apps SDK v1: A message was received from origin ${msg.origin}. `, msg.data);
        };
        this.onParentMessage = (msg) => {
            if (this.isValidMessage(msg)) {
                this.debugMode && this.logIncomingMessage(msg);
                this.handleIncomingMessage(msg.data);
            }
        };
        this.handleIncomingMessage = (payload) => {
            const { id } = payload;
            const cb = this.callbacks.get(id);
            if (cb) {
                cb(payload);
                this.callbacks.delete(id);
            }
        };
        this.send = (method, params) => {
            const request = MessageFormatter.makeRequest(method, params);
            if (this.isServer) {
                throw new Error("Window doesn't exist");
            }
            window.parent.postMessage(request, '*');
            return new Promise((resolve, reject) => {
                this.callbacks.set(request.id, (response) => {
                    if (!response.success) {
                        reject(new Error(response.error));
                        return;
                    }
                    resolve(response);
                });
            });
        };
        this.allowedOrigins = allowedOrigins;
        this.debugMode = debugMode;
        if (!this.isServer) {
            window.addEventListener('message', this.onParentMessage);
        }
    }
}
/* harmony default export */ var communication = (PostMessageCommunicator);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/types/sdk.js
const isObjectEIP712TypedData = (obj) => {
    return typeof obj === 'object' && obj != null && 'domain' in obj && 'types' in obj && 'message' in obj;
};
//# sourceMappingURL=sdk.js.map
// EXTERNAL MODULE: ./node_modules/@safe-global/safe-gateway-typescript-sdk/dist/index.js
var dist = __webpack_require__(18831);
;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/types/gateway.js

//# sourceMappingURL=gateway.js.map
;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/types/messaging.js

//# sourceMappingURL=messaging.js.map
;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/types/index.js




//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/txs/index.js


class TXs {
    constructor(communicator) {
        this.communicator = communicator;
    }
    async getBySafeTxHash(safeTxHash) {
        if (!safeTxHash) {
            throw new Error('Invalid safeTxHash');
        }
        const response = await this.communicator.send(Methods.getTxBySafeTxHash, { safeTxHash });
        return response.data;
    }
    async signMessage(message) {
        const messagePayload = {
            message,
        };
        const response = await this.communicator.send(Methods.signMessage, messagePayload);
        return response.data;
    }
    async signTypedMessage(typedData) {
        if (!isObjectEIP712TypedData(typedData)) {
            throw new Error('Invalid typed data');
        }
        const response = await this.communicator.send(Methods.signTypedMessage, { typedData });
        return response.data;
    }
    async send({ txs, params }) {
        if (!txs || !txs.length) {
            throw new Error('No transactions were passed');
        }
        const messagePayload = {
            txs,
            params,
        };
        const response = await this.communicator.send(Methods.sendTransactions, messagePayload);
        return response.data;
    }
}

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/eth/constants.js
const RPC_CALLS = {
    eth_call: 'eth_call',
    eth_gasPrice: 'eth_gasPrice',
    eth_getLogs: 'eth_getLogs',
    eth_getBalance: 'eth_getBalance',
    eth_getCode: 'eth_getCode',
    eth_getBlockByHash: 'eth_getBlockByHash',
    eth_getBlockByNumber: 'eth_getBlockByNumber',
    eth_getStorageAt: 'eth_getStorageAt',
    eth_getTransactionByHash: 'eth_getTransactionByHash',
    eth_getTransactionReceipt: 'eth_getTransactionReceipt',
    eth_getTransactionCount: 'eth_getTransactionCount',
    eth_estimateGas: 'eth_estimateGas',
    safe_setSettings: 'safe_setSettings',
};
//# sourceMappingURL=constants.js.map
;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/eth/index.js


const inputFormatters = {
    defaultBlockParam: (arg = 'latest') => arg,
    returnFullTxObjectParam: (arg = false) => arg,
    blockNumberToHex: (arg) => Number.isInteger(arg) ? `0x${arg.toString(16)}` : arg,
};
class Eth {
    constructor(communicator) {
        this.communicator = communicator;
        this.call = this.buildRequest({
            call: RPC_CALLS.eth_call,
            formatters: [null, inputFormatters.defaultBlockParam],
        });
        this.getBalance = this.buildRequest({
            call: RPC_CALLS.eth_getBalance,
            formatters: [null, inputFormatters.defaultBlockParam],
        });
        this.getCode = this.buildRequest({
            call: RPC_CALLS.eth_getCode,
            formatters: [null, inputFormatters.defaultBlockParam],
        });
        this.getStorageAt = this.buildRequest({
            call: RPC_CALLS.eth_getStorageAt,
            formatters: [null, inputFormatters.blockNumberToHex, inputFormatters.defaultBlockParam],
        });
        this.getPastLogs = this.buildRequest({
            call: RPC_CALLS.eth_getLogs,
        });
        this.getBlockByHash = this.buildRequest({
            call: RPC_CALLS.eth_getBlockByHash,
            formatters: [null, inputFormatters.returnFullTxObjectParam],
        });
        this.getBlockByNumber = this.buildRequest({
            call: RPC_CALLS.eth_getBlockByNumber,
            formatters: [inputFormatters.blockNumberToHex, inputFormatters.returnFullTxObjectParam],
        });
        this.getTransactionByHash = this.buildRequest({
            call: RPC_CALLS.eth_getTransactionByHash,
        });
        this.getTransactionReceipt = this.buildRequest({
            call: RPC_CALLS.eth_getTransactionReceipt,
        });
        this.getTransactionCount = this.buildRequest({
            call: RPC_CALLS.eth_getTransactionCount,
            formatters: [null, inputFormatters.defaultBlockParam],
        });
        this.getGasPrice = this.buildRequest({
            call: RPC_CALLS.eth_gasPrice,
        });
        this.getEstimateGas = (transaction) => this.buildRequest({
            call: RPC_CALLS.eth_estimateGas,
        })([transaction]);
        this.setSafeSettings = this.buildRequest({
            call: RPC_CALLS.safe_setSettings,
        });
    }
    buildRequest(args) {
        const { call, formatters } = args;
        return async (params) => {
            if (formatters && Array.isArray(params)) {
                formatters.forEach((formatter, i) => {
                    if (formatter) {
                        params[i] = formatter(params[i]);
                    }
                });
            }
            const payload = {
                call,
                params: params || [],
            };
            const response = await this.communicator.send(Methods.rpcCall, payload);
            return response.data;
        };
    }
}

//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/viem/_esm/utils/abi/encodeFunctionData.js + 1 modules
var encodeFunctionData = __webpack_require__(16878);
// EXTERNAL MODULE: ./node_modules/viem/_esm/utils/hash/keccak256.js + 2 modules
var keccak256 = __webpack_require__(54929);
;// CONCATENATED MODULE: ./node_modules/viem/_esm/constants/strings.js
const presignMessagePrefix = '\x19Ethereum Signed Message:\n';
//# sourceMappingURL=strings.js.map
// EXTERNAL MODULE: ./node_modules/viem/_esm/utils/data/concat.js
var concat = __webpack_require__(57040);
// EXTERNAL MODULE: ./node_modules/viem/_esm/utils/data/size.js
var size = __webpack_require__(39135);
// EXTERNAL MODULE: ./node_modules/viem/_esm/utils/encoding/toHex.js
var toHex = __webpack_require__(92106);
;// CONCATENATED MODULE: ./node_modules/viem/_esm/utils/signature/toPrefixedMessage.js




function toPrefixedMessage(message_) {
    const message = (() => {
        if (typeof message_ === 'string')
            return (0,toHex/* stringToHex */.$G)(message_);
        if (typeof message_.raw === 'string')
            return message_.raw;
        return (0,toHex/* bytesToHex */.ci)(message_.raw);
    })();
    const prefix = (0,toHex/* stringToHex */.$G)(`${presignMessagePrefix}${(0,size/* size */.d)(message)}`);
    return (0,concat/* concat */.zo)([prefix, message]);
}
//# sourceMappingURL=toPrefixedMessage.js.map
;// CONCATENATED MODULE: ./node_modules/viem/_esm/utils/signature/hashMessage.js


function hashMessage(message, to_) {
    return (0,keccak256/* keccak256 */.w)(toPrefixedMessage(message), to_);
}
//# sourceMappingURL=hashMessage.js.map
// EXTERNAL MODULE: ./node_modules/viem/_esm/utils/abi/encodeAbiParameters.js
var encodeAbiParameters = __webpack_require__(45444);
// EXTERNAL MODULE: ./node_modules/viem/_esm/errors/abi.js
var abi = __webpack_require__(57412);
// EXTERNAL MODULE: ./node_modules/viem/_esm/errors/address.js
var address = __webpack_require__(26087);
// EXTERNAL MODULE: ./node_modules/viem/_esm/utils/address/isAddress.js
var isAddress = __webpack_require__(49321);
;// CONCATENATED MODULE: ./node_modules/viem/_esm/utils/regex.js
const arrayRegex = /^(.*)\[([0-9]*)\]$/;
// `bytes<M>`: binary type of `M` bytes, `0 < M <= 32`
// https://regexr.com/6va55
const bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
// `(u)int<M>`: (un)signed integer type of `M` bits, `0 < M <= 256`, `M % 8 == 0`
// https://regexr.com/6v8hp
const integerRegex = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
//# sourceMappingURL=regex.js.map
;// CONCATENATED MODULE: ./node_modules/viem/_esm/utils/typedData.js








function serializeTypedData(parameters) {
    const { domain: domain_, message: message_, primaryType, types, } = parameters;
    const normalizeData = (struct, data_) => {
        const data = { ...data_ };
        for (const param of struct) {
            const { name, type } = param;
            if (type === 'address')
                data[name] = data[name].toLowerCase();
        }
        return data;
    };
    const domain = (() => {
        if (!types.EIP712Domain)
            return {};
        if (!domain_)
            return {};
        return normalizeData(types.EIP712Domain, domain_);
    })();
    const message = (() => {
        if (primaryType === 'EIP712Domain')
            return undefined;
        return normalizeData(types[primaryType], message_);
    })();
    return stringify({ domain, message, primaryType, types });
}
function validateTypedData(parameters) {
    const { domain, message, primaryType, types } = parameters;
    const validateData = (struct, data) => {
        for (const param of struct) {
            const { name, type } = param;
            const value = data[name];
            const integerMatch = type.match(integerRegex);
            if (integerMatch &&
                (typeof value === 'number' || typeof value === 'bigint')) {
                const [_type, base, size_] = integerMatch;
                // If number cannot be cast to a sized hex value, it is out of range
                // and will throw.
                (0,toHex/* numberToHex */.eC)(value, {
                    signed: base === 'int',
                    size: Number.parseInt(size_) / 8,
                });
            }
            if (type === 'address' && typeof value === 'string' && !(0,isAddress/* isAddress */.U)(value))
                throw new address/* InvalidAddressError */.b({ address: value });
            const bytesMatch = type.match(bytesRegex);
            if (bytesMatch) {
                const [_type, size_] = bytesMatch;
                if (size_ && (0,size/* size */.d)(value) !== Number.parseInt(size_))
                    throw new abi/* BytesSizeMismatchError */.KY({
                        expectedSize: Number.parseInt(size_),
                        givenSize: (0,size/* size */.d)(value),
                    });
            }
            const struct = types[type];
            if (struct)
                validateData(struct, value);
        }
    };
    // Validate domain types.
    if (types.EIP712Domain && domain)
        validateData(types.EIP712Domain, domain);
    // Validate message types.
    if (primaryType !== 'EIP712Domain')
        validateData(types[primaryType], message);
}
function getTypesForEIP712Domain({ domain, }) {
    return [
        typeof domain?.name === 'string' && { name: 'name', type: 'string' },
        domain?.version && { name: 'version', type: 'string' },
        typeof domain?.chainId === 'number' && {
            name: 'chainId',
            type: 'uint256',
        },
        domain?.verifyingContract && {
            name: 'verifyingContract',
            type: 'address',
        },
        domain?.salt && { name: 'salt', type: 'bytes32' },
    ].filter(Boolean);
}
function domainSeparator({ domain }) {
    return hashDomain({
        domain,
        types: {
            EIP712Domain: getTypesForEIP712Domain({ domain }),
        },
    });
}
//# sourceMappingURL=typedData.js.map
;// CONCATENATED MODULE: ./node_modules/viem/_esm/utils/signature/hashTypedData.js
// Implementation forked and adapted from https://github.com/MetaMask/eth-sig-util/blob/main/src/sign-typed-data.ts





function hashTypedData(parameters) {
    const { domain = {}, message, primaryType, } = parameters;
    const types = {
        EIP712Domain: getTypesForEIP712Domain({ domain }),
        ...parameters.types,
    };
    // Need to do a runtime validation check on addresses, byte ranges, integer ranges, etc
    // as we can't statically check this with TypeScript.
    validateTypedData({
        domain,
        message,
        primaryType,
        types,
    });
    const parts = ['0x1901'];
    if (domain)
        parts.push(hashTypedData_hashDomain({
            domain,
            types: types,
        }));
    if (primaryType !== 'EIP712Domain')
        parts.push(hashStruct({
            data: message,
            primaryType,
            types: types,
        }));
    return (0,keccak256/* keccak256 */.w)((0,concat/* concat */.zo)(parts));
}
function hashTypedData_hashDomain({ domain, types, }) {
    return hashStruct({
        data: domain,
        primaryType: 'EIP712Domain',
        types,
    });
}
function hashStruct({ data, primaryType, types, }) {
    const encoded = encodeData({
        data,
        primaryType,
        types,
    });
    return (0,keccak256/* keccak256 */.w)(encoded);
}
function encodeData({ data, primaryType, types, }) {
    const encodedTypes = [{ type: 'bytes32' }];
    const encodedValues = [hashType({ primaryType, types })];
    for (const field of types[primaryType]) {
        const [type, value] = encodeField({
            types,
            name: field.name,
            type: field.type,
            value: data[field.name],
        });
        encodedTypes.push(type);
        encodedValues.push(value);
    }
    return (0,encodeAbiParameters/* encodeAbiParameters */.E)(encodedTypes, encodedValues);
}
function hashType({ primaryType, types, }) {
    const encodedHashType = (0,toHex/* toHex */.NC)(encodeType({ primaryType, types }));
    return (0,keccak256/* keccak256 */.w)(encodedHashType);
}
function encodeType({ primaryType, types, }) {
    let result = '';
    const unsortedDeps = findTypeDependencies({ primaryType, types });
    unsortedDeps.delete(primaryType);
    const deps = [primaryType, ...Array.from(unsortedDeps).sort()];
    for (const type of deps) {
        result += `${type}(${types[type]
            .map(({ name, type: t }) => `${t} ${name}`)
            .join(',')})`;
    }
    return result;
}
function findTypeDependencies({ primaryType: primaryType_, types, }, results = new Set()) {
    const match = primaryType_.match(/^\w*/u);
    const primaryType = match?.[0];
    if (results.has(primaryType) || types[primaryType] === undefined) {
        return results;
    }
    results.add(primaryType);
    for (const field of types[primaryType]) {
        findTypeDependencies({ primaryType: field.type, types }, results);
    }
    return results;
}
function encodeField({ types, name, type, value, }) {
    if (types[type] !== undefined) {
        return [
            { type: 'bytes32' },
            (0,keccak256/* keccak256 */.w)(encodeData({ data: value, primaryType: type, types })),
        ];
    }
    if (type === 'bytes') {
        const prepend = value.length % 2 ? '0' : '';
        value = `0x${prepend + value.slice(2)}`;
        return [{ type: 'bytes32' }, (0,keccak256/* keccak256 */.w)(value)];
    }
    if (type === 'string')
        return [{ type: 'bytes32' }, (0,keccak256/* keccak256 */.w)((0,toHex/* toHex */.NC)(value))];
    if (type.lastIndexOf(']') === type.length - 1) {
        const parsedType = type.slice(0, type.lastIndexOf('['));
        const typeValuePairs = value.map((item) => encodeField({
            name,
            type: parsedType,
            types,
            value: item,
        }));
        return [
            { type: 'bytes32' },
            (0,keccak256/* keccak256 */.w)((0,encodeAbiParameters/* encodeAbiParameters */.E)(typeValuePairs.map(([t]) => t), typeValuePairs.map(([, v]) => v))),
        ];
    }
    return [{ type }, value];
}
//# sourceMappingURL=hashTypedData.js.map
;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/safe/signatures.js
const MAGIC_VALUE = '0x1626ba7e';
const MAGIC_VALUE_BYTES = '0x20c13b0b';

//# sourceMappingURL=signatures.js.map
;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/types/permissions.js
const PERMISSIONS_REQUEST_REJECTED = 4001;
class PermissionsError extends Error {
    constructor(message, code, data) {
        super(message);
        this.code = code;
        this.data = data;
        // Should adjust prototype manually because how TS handles the type extension compilation
        // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, PermissionsError.prototype);
    }
}
//# sourceMappingURL=permissions.js.map
;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/wallet/index.js


class Wallet {
    constructor(communicator) {
        this.communicator = communicator;
    }
    async getPermissions() {
        const response = await this.communicator.send(Methods.wallet_getPermissions, undefined);
        return response.data;
    }
    async requestPermissions(permissions) {
        if (!this.isPermissionRequestValid(permissions)) {
            throw new PermissionsError('Permissions request is invalid', PERMISSIONS_REQUEST_REJECTED);
        }
        try {
            const response = await this.communicator.send(Methods.wallet_requestPermissions, permissions);
            return response.data;
        }
        catch {
            throw new PermissionsError('Permissions rejected', PERMISSIONS_REQUEST_REJECTED);
        }
    }
    isPermissionRequestValid(permissions) {
        return permissions.every((pr) => {
            if (typeof pr === 'object') {
                return Object.keys(pr).every((method) => {
                    if (Object.values(RestrictedMethods).includes(method)) {
                        return true;
                    }
                    return false;
                });
            }
            return false;
        });
    }
}

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/decorators/requirePermissions.js


const hasPermission = (required, permissions) => permissions.some((permission) => permission.parentCapability === required);
const requirePermission = () => (_, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function () {
        // @ts-expect-error accessing private property from decorator. 'this' context is the class instance
        const wallet = new Wallet(this.communicator);
        let currentPermissions = await wallet.getPermissions();
        if (!hasPermission(propertyKey, currentPermissions)) {
            currentPermissions = await wallet.requestPermissions([{ [propertyKey]: {} }]);
        }
        if (!hasPermission(propertyKey, currentPermissions)) {
            throw new PermissionsError('Permissions rejected', PERMISSIONS_REQUEST_REJECTED);
        }
        return originalMethod.apply(this);
    };
    return descriptor;
};
/* harmony default export */ var requirePermissions = (requirePermission);
//# sourceMappingURL=requirePermissions.js.map
;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/safe/index.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






class Safe {
    constructor(communicator) {
        this.communicator = communicator;
    }
    async getChainInfo() {
        const response = await this.communicator.send(Methods.getChainInfo, undefined);
        return response.data;
    }
    async getInfo() {
        const response = await this.communicator.send(Methods.getSafeInfo, undefined);
        return response.data;
    }
    // There is a possibility that this method will change because we may add pagination to the endpoint
    async experimental_getBalances({ currency = 'usd' } = {}) {
        const response = await this.communicator.send(Methods.getSafeBalances, {
            currency,
        });
        return response.data;
    }
    async check1271Signature(messageHash, signature = '0x') {
        const safeInfo = await this.getInfo();
        const encodedIsValidSignatureCall = (0,encodeFunctionData/* encodeFunctionData */.R)({
            abi: [
                {
                    constant: false,
                    inputs: [
                        {
                            name: '_dataHash',
                            type: 'bytes32',
                        },
                        {
                            name: '_signature',
                            type: 'bytes',
                        },
                    ],
                    name: 'isValidSignature',
                    outputs: [
                        {
                            name: '',
                            type: 'bytes4',
                        },
                    ],
                    payable: false,
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
            ],
            functionName: 'isValidSignature',
            args: [messageHash, signature],
        });
        const payload = {
            call: RPC_CALLS.eth_call,
            params: [
                {
                    to: safeInfo.safeAddress,
                    data: encodedIsValidSignatureCall,
                },
                'latest',
            ],
        };
        try {
            const response = await this.communicator.send(Methods.rpcCall, payload);
            return response.data.slice(0, 10).toLowerCase() === MAGIC_VALUE;
        }
        catch (err) {
            return false;
        }
    }
    async check1271SignatureBytes(messageHash, signature = '0x') {
        const safeInfo = await this.getInfo();
        const encodedIsValidSignatureCall = (0,encodeFunctionData/* encodeFunctionData */.R)({
            abi: [
                {
                    constant: false,
                    inputs: [
                        {
                            name: '_data',
                            type: 'bytes',
                        },
                        {
                            name: '_signature',
                            type: 'bytes',
                        },
                    ],
                    name: 'isValidSignature',
                    outputs: [
                        {
                            name: '',
                            type: 'bytes4',
                        },
                    ],
                    payable: false,
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
            ],
            functionName: 'isValidSignature',
            args: [messageHash, signature],
        });
        const payload = {
            call: RPC_CALLS.eth_call,
            params: [
                {
                    to: safeInfo.safeAddress,
                    data: encodedIsValidSignatureCall,
                },
                'latest',
            ],
        };
        try {
            const response = await this.communicator.send(Methods.rpcCall, payload);
            return response.data.slice(0, 10).toLowerCase() === MAGIC_VALUE_BYTES;
        }
        catch (err) {
            return false;
        }
    }
    calculateMessageHash(message) {
        return hashMessage(message);
    }
    calculateTypedMessageHash(typedMessage) {
        const chainId = typeof typedMessage.domain.chainId === 'object'
            ? typedMessage.domain.chainId.toNumber()
            : Number(typedMessage.domain.chainId);
        let primaryType = typedMessage.primaryType;
        if (!primaryType) {
            const fields = Object.values(typedMessage.types);
            // We try to infer primaryType (simplified ether's version)
            const primaryTypes = Object.keys(typedMessage.types).filter((typeName) => fields.every((dataTypes) => dataTypes.every(({ type }) => type.replace('[', '').replace(']', '') !== typeName)));
            if (primaryTypes.length === 0 || primaryTypes.length > 1)
                throw new Error('Please specify primaryType');
            primaryType = primaryTypes[0];
        }
        return hashTypedData({
            message: typedMessage.message,
            domain: {
                ...typedMessage.domain,
                chainId,
                verifyingContract: typedMessage.domain.verifyingContract,
                salt: typedMessage.domain.salt,
            },
            types: typedMessage.types,
            primaryType,
        });
    }
    async getOffChainSignature(messageHash) {
        const response = await this.communicator.send(Methods.getOffChainSignature, messageHash);
        return response.data;
    }
    async isMessageSigned(message, signature = '0x') {
        let check;
        if (typeof message === 'string') {
            check = async () => {
                const messageHash = this.calculateMessageHash(message);
                const messageHashSigned = await this.isMessageHashSigned(messageHash, signature);
                return messageHashSigned;
            };
        }
        if (isObjectEIP712TypedData(message)) {
            check = async () => {
                const messageHash = this.calculateTypedMessageHash(message);
                const messageHashSigned = await this.isMessageHashSigned(messageHash, signature);
                return messageHashSigned;
            };
        }
        if (check) {
            const isValid = await check();
            return isValid;
        }
        throw new Error('Invalid message type');
    }
    async isMessageHashSigned(messageHash, signature = '0x') {
        const checks = [this.check1271Signature.bind(this), this.check1271SignatureBytes.bind(this)];
        for (const check of checks) {
            const isValid = await check(messageHash, signature);
            if (isValid) {
                return true;
            }
        }
        return false;
    }
    async getEnvironmentInfo() {
        const response = await this.communicator.send(Methods.getEnvironmentInfo, undefined);
        return response.data;
    }
    async requestAddressBook() {
        const response = await this.communicator.send(Methods.requestAddressBook, undefined);
        return response.data;
    }
}
__decorate([
    requirePermissions()
], Safe.prototype, "requestAddressBook", null);

//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/sdk.js





class SafeAppsSDK {
    constructor(opts = {}) {
        const { allowedDomains = null, debug = false } = opts;
        this.communicator = new communication(allowedDomains, debug);
        this.eth = new Eth(this.communicator);
        this.txs = new TXs(this.communicator);
        this.safe = new Safe(this.communicator);
        this.wallet = new Wallet(this.communicator);
    }
}
/* harmony default export */ var sdk = (SafeAppsSDK);
//# sourceMappingURL=sdk.js.map
;// CONCATENATED MODULE: ./node_modules/@safe-global/safe-apps-sdk/dist/esm/index.js

/* harmony default export */ var esm = (sdk);






//# sourceMappingURL=index.js.map

/***/ })

}]);