const SUCCESS = 'Success';
const ERROR = 'Error';
const METHOD_TYPE_GET_ATTACHMENTS = 'ATTACHMENT';
const METHOD_TYPE_UPDATE_PACKAGE_VERSION_INFO = 'UPDATE PACKAGE VERSION INFO';
const METHOD_TYPE_UPDATE_PACKAGE_INFO = 'UPDATE PACKAGE INFO';
const STATUS_400_INVALID_JSON_ERROR = 'STATUS 400: Invalid JSON format.';
const STATUS_404_ENDPOINT_NOT_FOUND = 'STATUS 404: Endpoint doesn\'t exist.';
const STATUS_500_INTERNAL_SERVER_ERROR = 'STATUS 500: Internal server error';
const REQUIRED_FIELDS_ERROR = 'Not all required fields are provided.';
const DOMAIN_ID_NOT_PROVIDED = 'Domain Id not provided.';
const COMPONENT_LENGTH_WRONG = 'There must be at least one component.';
const DEV_NODE_ENV = 'development';
const START_CREATE_UNLOCKED_PACKAGE = 'Start Create Unlocked Package';
const START_UPDATE_UNLOCKED_PACKAGE = 'Start Update Unlocked Package';
const START_LIST_INSTALLED_PACKAGES = 'Start List Installed packages';
const ATTACHMENTS_DELETED = 'The definition of some of these components may have been removed.';
const UNZIP_CATALOG_NAME = 'project_data';
const PACKAGE_NAME_MUST_BE_UNIQUE = 'The package name must be unique for the namespace.';
const PACKAGE_WITH_THIS_NAME_IS_EXIST = 'The package with this name already exists.';
const PROJECT_DIRECTORY_IS_EXIST = 'A project with these parameters already exists.';
const PACKAGE_INSTALLATION_URL_NOT_FOUND = 'Package installation URL not found.';
const SOURCE_OBJECT_DEPLOYMENT = 'Patch_Manifest__c';
const SOURCE_OBJECT_BRANCH = 'Component__c';

const SFDX_PROJECT_EXAMPLE = '{\n' +
  '  "packageDirectories": [\n' +
  '    {\n' +
  '      "path": "force-app",\n' +
  '      "default": true\n' +
  '    }\n' +
  '  ],\n' +
  '  "namespace": "",\n' +
  '  "sfdcLoginUrl": "https://login.salesforce.com",\n' +
  '  "sourceApiVersion": "50.0"\n' +
  '}';

const OBJECT_DATA = [
  'alerts',
  'actionOverrides',
  'searchLayouts',
  'assignmentRule',
  'autoResponseRule',
  'businessProcesses',
  'compactLayouts',
  'escalationRule',
  'fields',
  'fieldSets',
  'knowledgePublishes',
  'fieldUpdates',
  'labels',
  'listViews',
  'ManagedTopic',
  'matchingRules',
  'outboundMessages',
  'rules',
  'recordTypes',
  'sharingCriteriaRules',
  'sharingOwnerRules',
  'sharingReasons',
  'tasks',
  'validationRules',
  'webLinks'
];

const LIST_INSTALLED_PACKAGES_REQUIRED_FIELDS = ['instanceUrl', 'accessToken'];
const CREATE_PACKAGE_REQUIRED_FIELDS = ['username', 'userId', 'unlockedPackageTempLogId', 'unlockedPackageId', 'sessionId', 'orgId', 'domain', 'timestamp', 'packageName'];
const CREATE_PACKAGE_VERSION_REQUIRED_FIELDS = ['versionName', 'versionKey', 'componentList', 'username', 'userId', 'unlockedPackageVersionId', 'unlockedPackageTempLogId', 'unlockedPackageId', 'sfdxProject', 'sessionId', 'orgId', 'domain', 'timestamp', 'packageName'];

function getSFDXCreateProject(projectName) {
  return `sfdx force:project:create -n ${projectName}`;
}

function getSFDXConvertMetadata(path) {
  return `sfdx force:mdapi:convert -r ${path}`;
}

function getSFDXCreateUnlockedPackage(packageName, sessionId, description) {
  description = description ? `-d "${description}"` : '';
  return `sfdx force:package:create -n "${packageName}" -t "Unlocked" -r "force-app" ${description} -v "${sessionId}"`;
}

function getSFDXCreateUnlockedPackageVersion(packageName, sessionId, key, versionName, versionDescription, versionNumber) {
  versionDescription = versionDescription ? `-e "${versionDescription}"` : '';
  versionName = versionName ? `-a "${versionName}"` : '';
  versionNumber = versionNumber ? `-n "${versionNumber}"` : '';
  return `sfdx force:package:version:create -p "${packageName}" -v "${sessionId}" -t "Unlocked" -d "force-app" ${versionName} ${versionDescription} ${versionNumber} -k "${key}" --wait 10`;
}

function getSFDXInstalledPackageList(accessToken) {
  return `sfdx force:package:installed:list -u "${accessToken}" --json`;
}

module.exports = {
  SUCCESS,
  ERROR,
  METHOD_TYPE_GET_ATTACHMENTS,
  METHOD_TYPE_UPDATE_PACKAGE_INFO,
  METHOD_TYPE_UPDATE_PACKAGE_VERSION_INFO,
  STATUS_400_INVALID_JSON_ERROR,
  STATUS_404_ENDPOINT_NOT_FOUND,
  STATUS_500_INTERNAL_SERVER_ERROR,
  DOMAIN_ID_NOT_PROVIDED,
  COMPONENT_LENGTH_WRONG,
  DEV_NODE_ENV,
  START_CREATE_UNLOCKED_PACKAGE,
  START_UPDATE_UNLOCKED_PACKAGE,
  START_GET_INSTALLED_PACKAGES: START_LIST_INSTALLED_PACKAGES,
  ATTACHMENTS_DELETED,
  UNZIP_CATALOG_NAME,
  GET_INSTALLED_PACKAGES_REQUIRED_FIELDS: LIST_INSTALLED_PACKAGES_REQUIRED_FIELDS,
  CREATE_PACKAGE_REQUIRED_FIELDS,
  CREATE_PACKAGE_VERSION_REQUIRED_FIELDS,
  REQUIRED_FIELDS_ERROR,
  PACKAGE_NAME_MUST_BE_UNIQUE,
  PACKAGE_WITH_THIS_NAME_IS_EXIST,
  PROJECT_DIRECTORY_IS_EXIST,
  PACKAGE_INSTALLATION_URL_NOT_FOUND,
  SOURCE_OBJECT_BRANCH,
  SOURCE_OBJECT_DEPLOYMENT,
  OBJECT_DATA,
  SFDX_PROJECT_EXAMPLE,
  getSFDXCreateProject,
  getSFDXConvertMetadata,
  getSFDXCreateUnlockedPackage,
  getSFDXCreateUnlockedPackageVersion,
  getSFDXInstalledPackageList
};
