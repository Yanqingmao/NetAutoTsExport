
<style>#write{padding-left:350px!important;}.md-toc {z-index: 999; display: block; position: fixed;left: 6px;top:10px;width:350px;word-wrap: break-word; /* word-break:break-all; */ overflow: scroll; } .md-toc-item { margin-right: 40px; }   </style>
[TOC]

# 1. NetAutoTsExport

This program can export the controller and its action(include the parameter of in or out) to TypeScript code.  
It will be very heplful to access the server action in browser.  

see __[Faq] <https://yanqingmao.github.io/NetAutoTsExport/html/faq.html>__  
查看 __[中文版本 Readme] <https://yanqingmao.github.io/NetAutoTsExport/html/README.zh-cn.html>__  
  
see __[Asp.Net Example Project]<https://github.com/Yanqingmao/NetAutoTsExport_AspNetExample>__  
see __[Use the exported TypeScript code in Vue Project]<https://github.com/Yanqingmao/NetAutoTsExport_VueExample>__  

## 1.1 Program Version

This program support  

### 1.1.1 Asp.Net(4.5 Or Greater)  

support .NetFramework 4.5 or greater version.  

<https://yanqingmao.github.io/NetAutoTsExport/html/NetAutoTsExport_NetFramework_Console.zip>  
run in console, must assign the Export Configuration Json file path.

<https://yanqingmao.github.io/NetAutoTsExport/html/NetAutoTsExport_NetFramework_WinForm.zip>  
run with Windows Form.

### 1.1.2 .NetCore3.1

support .NetCore3.1 or lower version.

<https://yanqingmao.github.io/NetAutoTsExport/html/NetAutoTsExport_NetCore3_Console.zip>  
run in console, must assign the Export Configuration Json file path.

<https://yanqingmao.github.io/NetAutoTsExport/html/NetAutoTsExport_NetCore3_WinForm.zip>  
run with Windows Form.

### 1.1.3 .Net5

support .Net5 or lower version.
<https://yanqingmao.github.io/NetAutoTsExport/html/NetAutoTsExport_Net5_Console.zip>  
run in console, must assign the Export Configuration Json file path.

<https://yanqingmao.github.io/NetAutoTsExport/html/NetAutoTsExport_Net5_WinForm.zip>  
run with Windows Form.

## 1.2 Json Configuration Parameter

### 1.2.1 AssemblyDirPath

__Must Assign__  
Assign the directory which contains all the assemblys of csharp.  
This program will auto scan all assembly in this directory.  
And it will scann all the xml file for produce the remark of controller or action or other exported content.  
Attention, You can __assing only one directory__.  
For example，  
`K:\TotalDevelopNew\TsGenAspnetExample\bin`

### 1.2.2 AssemblyXmlDirPath

__Optional__  
Assign the directory which contains the xml file that is built as a remark of assembly.  
Attention, You can __assing only one directory__.  
For example，  
`K:\TotalDevelopNew\TsGenAspnetExample\`  

### 1.2.3 BaseUrl

__Must Assign__  
The base url of web project.  
All controller will accord this url to access.  
You can change the baseUrl by the followed code anytime. But we sugguest strongly you assign it in json configuration.

```typescript
import * as Root from '@/auto/control'; 
...
Root.HongboRootControl.BaseUrl = "http://localhost/x";
```

for example, you can assign BaseUrl as follows value.  
`http://localhost/TsGenAspnetExample`

### 1.2.4 DefaultMvcRoute

__Optional__,  the default value will be "{controller}/{action}/{id?}".  
You can see the RouteConfig.cs or Startup.cs for the default MVC route value.  
You can change the DefaultMvcRoute by the followed code anytime. But we sugguest strongly you assign it in json configuration.

```typescript
import * as Root from '@/auto/control'; 
...
Root.HongboRootControl.DefaulMvctRoute = "{controller}/{action}/{id?}";
```

### 1.2.5 DefaultWebapiRoute

__Optional__, the default value will be "api/{controller}/{id?}".  
You can see the WebapiConfig.cs or Startup.cs for the default WebApi route value.  
You can change the DefaultWebapiRoute by the followed code anytime. But we sugguest strongly you assigned it in json configuration.

```typescript
import * as Root from '@/auto/control'; 
...
Root.HongboRootControl.DefaulWebapitRoute = "{controller}/{action}/{id?}";
```

### 1.2.6 AllowStringToNull

Whether the string property can be null; the default value is true;  
if true, the property can be null;  
if false, the property cannot be null;  
This value will produce different definition for string property.  
For example,  

```typescript
export class Entity {
    constructor() {
    }
    //propB: null | string; // when AllowStringToNull set to true,
    propB:  string;         // when AllowStringToNull set to false,
}
```

### 1.2.7 StringDefaultEmpty

Whether the default value of string property would be empty string.  The default value is true.  
if true or AllowStringToNull=false,  the default value of string property would be empty string;  
if false and AllowStringToNull=true, the default value of string property would be null;  
For example,  

```typescript
export class Entity {
    constructor() {         
        //propB = null;  // when AllowStringToNull=true & StringDefaultEmpty=false
        propB = "";      // when StringDefaultEmpty=true or AllowStringToNull=false
    }
    //propB: null | string; // when AllowStringToNull set to true,
    propB:  string;         // when AllowStringToNull set to false,
}
```

### 1.2.8 BuildRefererInstance

Whether build a instance when property is relate to other type definition.  
The default value is true.  
Attention, if find loop depends in this type and its property, this property would be assigned to null in constuctor function.  
For example,  

```typescript
export class EntityA {
    constructor() { 
        this.propB = new EntityB();  // when BuildRefererInstance set to true,
        // propB = null;        // when BuildRefererInstance set to false,
        this.propC = null;   // find the loop depends in EntityA and EntityC.
    }
    propB: null | EntityB;
    propC: null | EntityC;
}
export class EntityB {    
}
export class EntityC {
    constructor() {
        this.propA = null;
    }
    propA: null | EntityA;
}
```

### 1.2.9 ExportRemark

Whether export the remark for exported content. The default value is true.  
You must assign the directory which contains the xml file which contains remarks for the assemblys.  

### 1.2.10 ArrayCanBeNull

Whether the array can be null. the default will be false.

```typescript
export class EntityA {
    constructor() { 
        this.propB = [];          // when ArrayCanBeNull set to false,
        // this.propB = null;        // when ArrayCanBeNull set to true,
    }
    propB: Array<string>;        // when ArrayCanBeNull set to false,
    // propB: Null_Or_Array<string>;   // when ArrayCanBeNull set to true,
}
```

### 1.2.11 produceTypeNamePropeprty

Whether add another property for the type name of csharp. The default value is true.  
The name of extra property is __hbTypename__.  
For example,

```typescript
export class EntityA {
    constructor() { 
        this.hbTypename = "TsgenExample.Models.EntityA";
    }
    hbTypename: string;
}
```

### 1.2.12 produceEntityInterface

Whether produce the interface definition for every type. The default value is false.  
If true, will produce TypeScript interface definition for every type, and produce a TypeScript implement class for this interface with a Imp appenx.  
If false, only produce a TypeScript class definition for every type.  
For example, when produceEntityInterface=true

```typescript
    // tslint:disable-next-line:interface-name & class-name
    export interface PlaySchemaFullItemGroup {
        BeginDateTime: Date;
    }
    export class PlaySchemaFullItemGroupImpl implements PlaySchemaFullItemGroup {
        BeginDateTime: Date;
        constructor() {
            this.BeginDateTime = new Date(-62135596800000+0800);
        }
    }
```

when produceEntityInterface=false

```typescript
    export class PlaySchemaFullItemGroupImpl {
        BeginDateTime: Date;
        constructor() {
            this.BeginDateTime = new Date(-62135596800000+0800);
        }
    }
```

### 1.2.13 OutputFieldSourceInConstruct

Whether produce original source for the property in the constructor.  The default value is false.  
For example, when OutputFieldSourceInConstruct=true  

```typescript
    export class PlaySchemaFullItemGroupImpl {
        BeginDateTime: Date;
        constructor() {
            // EhayWebApi -- EhayWebApi.Model -- PlaySchemaFullItemGroup -- BeginDateTime
            this.BeginDateTime = new Date(-62135596800000+0800);
        }
    }
```

### 1.2.14 produceAntiJqueryParamInConstruct

Whether produce code for anti the JQuery.query funciton.  The default value is false.  
Sometimes, JQuery.param will call the constructor function for the type, but transfer a null as this.  
It maybe produce error when this is transfered as null when in the constructor function.  
Setting produceAntiJqueryParamInConstruct to true can avoid this error.  
For example, when produceAntiJqueryParamInConstruct=true  

```typescript
constructor() {
    if (!this) return; // sometime jquery.param will call this contructor,but transfer null to it
}
```

### 1.2.15 DefineStaticControlStance

Whether defined a static instance for every controller which can be instanced. The default value is true.  
This will be more convinient for access the action in every controller.  
The definition of controller defined in the bottom of namespace section.  
For example, when DefineStaticControlStance=true  

```typescript
export namespace EhayWebApi.Controllers {
    ...
    /** define a static instance of RfidCupController */
    export const RfidCupInstance: RfidCupController = new RfidCupController();
}
```

### 1.2.16 UseCamelPropertyName

whether property name use the camel model; the default value is false.  
if true,  property name use the camel model.
or elase, property name will reserve the original name;
for exmaple, when UseCamelPropertyName = true

```c#
public class Entity 
{
   public string Name {get; set; 
}
```

```typescript
export class Entity {
    constructor() { 
        this.name = """";
    }
    name: Null_Or_String; // the Name would be name for camel mode.
}
```

### 1.2.17 ExportConstDefine

Whether export Const Property in entity or controller; the default value is false.  
if set true, export const property in entity or controller;  
or else, dont export.  
The property of const will reserve the original name even if UseCamelPropertyName is set to true.  
for example,  

```typescript
export class PropA {
    static readonly ConstProp: string = ""Abc""; 
    constructor() {
    }
}
```

### 1.2.18 LimitControlTypes

Limit the control for export using the regex expression.
If defined, the control wouldn't export when its namespace and name don't match this __LimitControlTypes__.
But, if export an controller, its parent controller will ignore this LimitControlTypes value and exported.
For example，LimitControlTypes=__Ehay[.]Controllers[.].*__  limit only export the controls whose namespace is Ehay.Controllers.

### 1.2.19 AttrForExportModel

Define attributes for export one type even if this type is not used by any action.  
When a type is not accessed by an action with the in-out parameter, it would exported to TypeScript.  
You can define an attribute and assign it to a type, then assign the name of Attribute type to AttrForExportModel, this type would proudct TypeScript definition.  
You can assign multi attribute name splited with comma.  
For example，when AttrForExportModel=__AlwaysExportAttribute__

```c#
/// <summary>
/// define an attribute.
/// </summary>
public class AlwaysExportAttribute : Attribute
{
}
/// <summary>
/// assign the attribute to the type, it would produce the TypeSript defition even if it is not used by any action.
/// </summary>
[AlwaysExport]
public class EntityAlwaysExport
{
}
```

### 1.2.20 AttrsForExceptProperty

Define attributes for ignore one type even if this type is used by an a ction.  
When a type is accessed by an action with the in-out parameter, it would exported to TypeScript.  
You can define an attribute and assign it to a type, then assign the name of Attribute type to AttrsForExceptProperty,
this type wouldn't proudct TypeScript definition.  
In the TypeScript code, this type would replaced with "any";  
You can assign multi attribute name splited with comma.  
For example，AttrsForExceptProperty=__AlwaysIgnoreAttribute__

```c#
/// <summary>
/// define an attribute.
/// </summary>
public class AlwaysIgnoreAttribute : Attribute
{
}
/// <summary>
/// assign the attribute to the type, it wouldn't produce the TypeSript defition even if it is used by an action.
/// </summary>
[AlwaysIgnore]
public class EntityAlwaysDontExport
{
}
```

### 1.2.21 AttrsForJsonResultTypes

Define attributes to assign an return type for an action.  
The attribute should contain ResultType property.  
For example， AttrsForJsonResultTypes=__JsonResultTypeAttribute__  

```c#
/// <summary>
/// define attribute 
/// </summary>
public class JsonResultTypeAttribute : Attribute
{
        public JsonResultTypeAttribute()
        {
        }
        ///<summary>
        ///this assigned the real data type.
        ///</summary>
        public Type ResultType { get; set; }
}
public class Dog 
{
    public string Name { get; set; }
}
public class HomeController : Controller
{
        /// <summary>
        /// assigned the return data type by JsonResultType attribute.  
        /// </summary>
        [JsonResultType(ResultType = typeof(Dog))]
        public JsonResult Index(MyDbContext dbContext)
        {
            return new JsonResult
            {
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                Data = new Dog
                {
                    Name = "Xiaomao",
                }
            };
        }
}
```

### 1.2.22 SendRequestType  

How send the rquest to the server.  
It supported the followed javascript library.

#### 1.2.22.1 1. Axios

   see <http://www.axios-js.com/>  

#### 1.2.22.2 2. Jquery

   see <https://jquery.com/>  

#### 1.2.22.3 3. BrowserFetch

   see <https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API>  

#### 1.2.22.4 4. UniAppRequest

   see <https://uniapp.dcloud.io/api/README>  

#### 1.2.22.5 5. WechatLittleApp  

   see <https://developers.weixin.qq.com/miniprogram/dev/api/>  

Different library will produce different import and TypeScript code to send the request to server;

### 1.2.23 ExportDirPath  

assign directory to save the TypeScript file.  
__Must Assign__  