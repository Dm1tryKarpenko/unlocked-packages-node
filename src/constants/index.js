const SUCCESS = 'Success';
const ERROR = 'Error';
const METHOD_TYPE_GET_ATTACHMENTS = 'ATTACHMENT';
const METHOD_TYPE_UPDATE_PACKAGE_VERSION_INFO = 'UPDATE PACKAGE VERSION INFO';
const METHOD_TYPE_UPDATE_PACKAGE_INFO = 'UPDATE PACKAGE INFO';
const METHOD_TYPE_CREATE_SNAPSHOT = 'CREATE SNAPSHOT';
const METHOD_TYPE_ADD_COMPONENTS_TO_SNAPSHOT = 'ADD COMPONENTS TO SNAPSHOT';
const METHOD_UPDATE_LOG = 'UPDATE LOG';
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
const START_LIST_UNLOCKED_INSTALLED_PACKAGES = 'Start List Installed Unlocked packages';
const START_LIST_CREATED_PACKAGES = 'Start Created Installed packages';
const START_CREATE_SNAPSHOT_FROM_UNLOCKED_PACKAGE = 'Start Create Snapshot From Unlocked Package';
const ATTACHMENTS_DELETED = 'The definition of some of these components may have been removed.';
const UNZIP_CATALOG_NAME = 'project_data';
const PACKAGE_NAME_MUST_BE_UNIQUE = 'The package name must be unique for the namespace.';
const PACKAGE_WITH_THIS_NAME_IS_EXIST = 'The package with this name already exists.';
const PROJECT_DIRECTORY_IS_EXIST = 'A project with these parameters already exists.';
const PACKAGE_INSTALLATION_URL_NOT_FOUND = 'Package installation URL not found.';
const SOURCE_OBJECT_DEPLOYMENT = 'Patch_Manifest__c';
const SOURCE_OBJECT_BRANCH = 'Component__c';
const ZIP_PACKAGE_NAME = 'unpackaged.zip';
const MAX_SIZE_UNZIP_ATTACHMENT = 2500000;
const QUERY_INSTALLED_UNLOCKED_PACKAGE_LIST = 'SELECT+SubscriberPackage.Name,+SubscriberPackageVersion.Dependencies,+SubscriberPackageVersion.Package2ContainerOptions+FROM+InstalledSubscriberPackage';
const QUERY_INSTALLED_UNLOCKED_PACKAGE_LIST_WITHOUT_DEPEND = 'SELECT+SubscriberPackage.Name,+SubscriberPackageVersion.Package2ContainerOptions,SubscriberPackageVersionId+FROM+InstalledSubscriberPackage';

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
const CREATE_SNAPSHOT_FROM_UNLOCKED_PACKAGE_REQUIRED_FIELDS = ['instanceUrl', 'accessToken', 'sourceAccessToken', 'sourceUrl', 'packageName', 'snapshotName', 'orgId', 'metadataLogId', 'logAttachmentId', 'namespacePrefix'];
const CREATE_PACKAGE_REQUIRED_FIELDS = ['username', 'userId', 'unlockedPackageTempLogId', 'unlockedPackageId', 'sessionId', 'orgId', 'domain', 'timestamp', 'packageName'];
const CREATE_PACKAGE_VERSION_REQUIRED_FIELDS = ['versionName', 'versionKey', 'componentList', 'username', 'userId', 'unlockedPackageVersionId', 'unlockedPackageTempLogId', 'unlockedPackageId', 'sfdxProject', 'sessionId', 'orgId', 'domain', 'timestamp', 'packageName'];

function getDependencyQuery(subscriberPackageVersionId) {
  return `SELECT id, Dependencies FROM SubscriberPackageVersion where id = '${subscriberPackageVersionId}'`;
}

function getPackageById(packageId) {
  return `SELECT+SubscriberPackage.Name,+SubscriberPackageVersion.Dependencies+FROM+InstalledSubscriberPackage+WHERE+SubscriberPackageVersionId+=+'${packageId}'`;
}

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

function getSFDXCreatedPackageList(accessToken) {
  return `sfdx force:package:list -v "${accessToken}" --json`;
}

function getSFDXRetrievePackage(accessToken, packageName) {
  return `sfdx force:mdapi:retrieve -p "${packageName}" -r ./ -u "${accessToken}"`;
}

function getSFDXMetadataInfo(componentType, accessToken) {
  return `sfdx force:mdapi:listmetadata -m "${componentType}" -u "${accessToken}" --json`;
}

const METADATA_FOLDER_TYPE_MAP = {
  // "CustomLabels": "labels", In filter set

  "AutoResponseRules": "autoResponseRules",
  "AutoResponseRule": "autoResponseRules",
  "ModerationRule": "moderation",
  "KeywordList": "moderation",
  "AssignmentRules": "assignmentRules",
  "AssignmentRule": "assignmentRules",
  "EscalationRule": "escalationRules",
  "EscalationRules": "escalationRules",
  "AuraDefinitionBundle": "aura",
  "LightningMessageChannel": "messageChannels",
  "ApexClass": "classes",
  "ApexComponent": "components",
  "CustomMetadata": "customMetadata",
  "Dashboard": "dashboards",
  "DashboardFolder": "dashboardFolders",
  "EmailTemplate": "email",
  // "EmailFolder": "emailFolders", ???
  "FlexiPage": "flexipages",
  "Flow": "flows",
  "HomePageComponent": "homePageComponents",
  "HomePageLayout": "homePageLayouts",
  "CustomLabel": "labels",
  "Layout": "layouts",
  "Letterhead": "letterhead",
  "CustomObject": "objects",
  "SharingRule": "sharingRules",
  "CustomField": "objects",
  "FieldSet": "objects",
  "RecordType": "objects",
  "ValidationRule": "objects",
  "WebLink": "objects",
  "ListView": "objects",
  "ApexPage": "pages",
  "PermissionSet": "permissionsets",
  "PermissionSetGroup": "permissionsetgroups",
  "Profile": "profiles",
  "QuickAction": "quickActions",
  "RemoteSiteSetting": "remoteSiteSettings",
  "Report": "reports",
  // "ReportFolder": "reportFolders", ???
  "ReportType": "reportTypes",
  "StaticResource": "staticresources",
  "ApexTrigger": "triggers",
  "CustomPageWebLink": "weblinks",
  "Workflow": "workflows",
  "ActionLinkGroupTemplate": "actionLinkGroupTemplates",
  "AnalyticSnapshot": "analyticSnapshots",
  "ApexTestSuite": "testSuites",
  "AppMenu": "appMenus",
  "ApprovalProcess": "approvalProcesses",
  "AuthProvider": "authproviders",
  "BusinessProcess": "objects",
  "BrandingSet": "brandingSets",
  "CallCenter": "callCenters",
  "Certificate": "certs",
  "ChannelLayout": "channelLayouts",
  "CleanDataService": "cleanDataServices",
  "Community": "communities",
  "CompactLayout": "objects",
  "ConnectedApp": "connectedApps",
  "ContentAsset": "contentassets",
  "CorsWhitelistOrigin": "corsWhitelistOrigins",
  "CspTrustedSite": "cspTrustedSites",
  "CustomApplication": "applications",
  "CustomApplicationComponent": "customApplicationComponents",
  "CustomObjectTranslation": "objectTranslations",
  "CustomPermission": "customPermissions",
  "CustomSite": "sites",
  "CustomTab": "tabs",
  "DataCategoryGroup": "datacategorygroups",
  "DelegateGroup": "delegateGroups",
  "Document": "documents",
  // "DocumentFolder": "documentFolders", ????
  "Audience": "audience",
  "DuplicateRule": "duplicateRules",
  "EclairGeoData": "eclair",
  "EmailServicesFunction": "emailservices",
  "EmbeddedServiceBranding": "embeddedServiceBrandings",
  "EmbeddedServiceConfig": "embeddedServiceConfigs",
  "ExternalDataSource": "dataSources",
  "ExternalServiceRegistration": "externalServiceRegistrations",
  "FlowCategory": "flowCategories",
  "FlowDefinition": "flowDefinitions",
  "GlobalValueSet": "globalValueSets",
  "GlobalValueSetTranslation": "globalValueSetTranslations",
  "Group": "groups",
  "InstalledPackage": "installedPackages",
  "LeadConvertSettings": "leadConvertSettings",
  "LightningBolt": "lightningBolts",
  "LightningComponentBundle": "lwc",
  "LightningExperienceTheme": "lightningExperienceThemes",
  "NamedCredential": "namedCredentials",
  "NetworkBranding": "networkBranding",
  "PathAssistant": "pathAssistants",
  "PlatformCachePartition": "cachePartitions",
  "PostTemplate": "postTemplates",
  "ProfilePasswordPolicy": "profilePasswordPolicies",
  "ProfileSessionSetting": "profileSessionSettings",
  "Queue": "queues",
  "Role": "roles",
  "SamlSsoConfig": "samlssoconfigs",
  "Scontrol": "scontrols",
  "Settings": "settings",
  "SharingCriteriaRule": "sharingCriteriaRules",
  "SharingOwnerRule": "sharingOwnerRules",
  "SharingTerritoryRule": "sharingTerritoryRules",
  "SharingSet": "sharingSets",
  "SiteDotCom": "siteDotComSites",
  "StandardValueSet": "standardValueSets",
  "StandardValueSetTranslation": "standardValueSetTranslations",
  "SynonymDictionary": "synonymDictionaries",
  "TopicsForObjects": "topicsForObjects",
  "WorkflowAlert": "alerts",
  "WorkflowFieldUpdate": "fieldUpdates",
  "WorkflowKnowledgePublish": "knowledgePublishes",
  "WorkflowOutboundMessage": "outboundMessages",
  "WorkflowRule": "rules",
  "WorkflowTask": "tasks",
  "ManagedTopics": "managedTopics",
  "SharingReason": "sharingReasons",
  "UserCriteria": "userCriteria",
  "EntitlementTemplate": "entitlementTemplates",
  "EntitlementProcess": "entitlementProcesses",
  "Network": "networks",
  "MilestoneType": "milestoneTypes",
  "NotificationTypeConfig": "notificationTypeConfig",
  "NavigationMenu": "navigationMenus",
  "ManagedContentType": "managedContentTypes",
  "IframeWhiteListUrlSettings": "iframeWhiteListUrlSettings",
  "CustomNotificationType": "notificationtypes",
  "CommunityThemeDefinition": "communityThemeDefinitions",
  "ApexEmailNotifications": "apexEmailNotifications",
  "Territory2Type": "territory2Types",
  "CampaignInfluenceModel": "campaignInfluenceModels",
  "LiveChatSensitiveDataRule": "liveChatSensitiveDataRule",
  "Territory2Model": "territory2Models",
  "Territory2": "territories"
}

module.exports = {
  SUCCESS,
  ERROR,
  METHOD_TYPE_GET_ATTACHMENTS,
  METHOD_TYPE_UPDATE_PACKAGE_INFO,
  METHOD_TYPE_UPDATE_PACKAGE_VERSION_INFO,
  METHOD_TYPE_CREATE_SNAPSHOT,
  METHOD_TYPE_ADD_COMPONENTS_TO_SNAPSHOT,
  METHOD_UPDATE_LOG,
  STATUS_400_INVALID_JSON_ERROR,
  STATUS_404_ENDPOINT_NOT_FOUND,
  STATUS_500_INTERNAL_SERVER_ERROR,
  DOMAIN_ID_NOT_PROVIDED,
  COMPONENT_LENGTH_WRONG,
  DEV_NODE_ENV,
  START_CREATE_UNLOCKED_PACKAGE,
  START_UPDATE_UNLOCKED_PACKAGE,
  START_LIST_INSTALLED_PACKAGES,
  START_LIST_UNLOCKED_INSTALLED_PACKAGES,
  START_LIST_CREATED_PACKAGES,
  START_CREATE_SNAPSHOT_FROM_UNLOCKED_PACKAGE,
  ATTACHMENTS_DELETED,
  UNZIP_CATALOG_NAME,
  LIST_INSTALLED_PACKAGES_REQUIRED_FIELDS,
  CREATE_SNAPSHOT_FROM_UNLOCKED_PACKAGE_REQUIRED_FIELDS,
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
  ZIP_PACKAGE_NAME,
  MAX_SIZE_UNZIP_ATTACHMENT,
  QUERY_INSTALLED_UNLOCKED_PACKAGE_LIST,
  QUERY_INSTALLED_UNLOCKED_PACKAGE_LIST_WITHOUT_DEPEND,
  getDependencyQuery,
  getPackageById,
  getSFDXCreateProject,
  getSFDXConvertMetadata,
  getSFDXCreateUnlockedPackage,
  getSFDXCreateUnlockedPackageVersion,
  getSFDXInstalledPackageList,
  getSFDXCreatedPackageList,
  getSFDXRetrievePackage,
  getSFDXMetadataInfo,
  METADATA_FOLDER_TYPE_MAP
};
