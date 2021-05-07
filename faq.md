
<style>#writer{padding-left: 350px;}.md-toc {z-index: 999; display: block; position: fixed;left: 6px;top:10px;width:350px;word-wrap: break-word; /* word-break:break-all; */ overflow: scroll; } .md-toc-item { margin-right: 40px; }   </style>
[TOC]
# 1. FAQ

查看 __[中文Faq] <https://yanqingmao.github.io/NetAutoTsExport/html/faq.zh-cn.html>__  

## 1.1 What is NetAutoTsExport?

NetAutoTsExport is a program that convert the service side action in a Net environment to a TypeScript code in http client according to the Json Configuration.  
During the conversion process, it will try to avoid exporting classes that the action does not use for saving client code.

## 1.2 Why does the exported TypeScript code contain a large number of type definitions??

On the server side, a variable can be assigned a null when it points to a normal class;  
But in TypeScript, there is no such mechanism;  
And if you use, `entityProp?: Entity` to define a property. When the entityProp is not specified a value in the constructor,  the entityProp will be undefined.  
Assigning a property to undefined maybe cause some problems, such as in Vue, property with undefined value  cannot be bound and monitored;  
Instead, assigning a property to null allows you to bind and monitored to the property normally.  
So we can't use the `entityProp?: Entity` form to define properties that might be null,  
Instead, we use `entityProp: null | The Entity` form defines the type of property.  
So, we first defined the type definition that might be null in the exported TypeScript.  
For example

```typescript
// null or generic element
export type Null_Or_<TElement> =  null | TElement;
// null or generic array element
export type Null_Or_ArrayGeneral<TElement> =  Null_Or_<Array<TElement>>;
// null or string
export type Null_Or_String = null | string;
// null or System.Text.DecoderFallback
export type Null_Or_DecoderFallbackInSystemText = Null_Or_<System.Text.DecoderFallback>;
```

All type definitions will use Null_Or_ as a prefix.  
Then there's the class name, In and the namespace of class.  
For example, `Null_Or_DecoderFallbackInSystemText`.  
However, if the class has a native type in TypeScript, use the Null_Or_ native type directly, such as the `Null_Or_String`.

## 1.3 What will be exported?

The software scans all assemblies in a given directory, looking for all controllers and actions under the controllers.  
Depending on Action, export the input parameters of Action and the type of return parameters to TypeScript, and export the controller and Action.  
The software will also scan Xml files in a given directory, look for comments on the exported content, and export them to typeScript code.  

## 1.4 Why is the export divided into 2 files?

The exported TypeScript will be divided into 2 files.  
One name is entity.ts, which holds all the types used by Action.  
One name is control.ts, which holds all Controller and Action.
The two files are divided into two files to enable users to use the classes in entity.ts alone without having to access control.ts.  

## 1.5 There is a class that is not used by any Action as an input/output parameter. Can I export it??

OK.
Do as follows.  
A. Define a subclass of Attribute,
B. Assign the Attribute subclass to the class to be exported
C. Specify the name of the Attribute subclass to be assigned to the __attrForexPortModel__ property in the exported JSON configuration.

If there are many classes like the one above that need to be exported, you can define an additional class as above and then define the properties of the class to be exported inside that class to avoid making too many changes to the code.

Alternatively, you can define a new project and then include the above Attribute subclass and additional classes in the project without changing the original project.

For example,

```csharp
/// <summary>
/// Define an annotation class that produces TypeScript definitions
/// Note that you need to specify the AttrForexPortModel in the export configuration to  AlwaysExportAttribute
/// </summary>
public class AlwaysExportAttribute : Attribute
{
}
/// <summary>
/// This class always produce TypeScript definitions, even if they are not used by any Action
/// </summary>
[AlwaysExport]
public class ExportHolderForExport
{
    // not used by any action but need product TypeScript 
    public EntityA A { get; set;}
    // not used by any action but need product TypeScript 
    public EntityB B { get; set;}
    // not used by any action but need product TypeScript 
    public EntityC C { get; set;}
    ......
}
```

## 1.6 Is there a class that is used by one action as an input and output parameter, can it not be exported?

OK.
a. Define a subclass of Attribute,  
b. Assign attribute subclasses to classes that you do not want to export  
c. Specify that the name of the Attribute subclass is assigned to the __AttrsForExceptProperty__ property in the export Json configuration.  
For classes that are not exported but are used by an Action as an input/output parameter, the parameter type is replaced by any.  
For example

```csharp
/// <summary>
/// Define a Attribute class, and the class containing the label will not produce a TypeScript definition.
/// Note that you need to specify AttrsForExceptProperty in the export configuration to AlwaysIgnore Attribute
/// </summary>
public class AlwaysIgnoreAttribute : Attribute
{
}
/// <summary>
/// This class does not produce a TypeScript definition, even if it is used by one action
/// </summary>
[AlwaysIgnore]
public class ExportHolderForExcept
{
    ......
}
```

## 1.7 Can I not export one Action or not export one Controller?

OK.  
a. Define a subclass of Attribute.  
b. Assign the Attribute subclass to Action or Controller that you do not want to export.  
c. Specify that the name of the Attribute subclass to the __AttrsForExceptProperty__ property in the export Json configuration.  

## 1.8 How will Dictionary<object, Entity > be exported?

Dictionary&lt;object, OtherType> Will Be Exported To Any;  
For Dictionary that can be mapped to a Record type, it is exported as Record;  
In TypeScript, Record supports string supports | number | The symbol record is the key.  
Therefore, for Dictionary<string, Entity>, Dictionary <number, Entity> types are exported as Record types.  
All Dictionary is not exported as a map type because the map type cannot be serialized normally using JSON.stringify.  

## 1.9 How do I handle a controller route or a route on Action?

Export software can correctly identify routes defined on Controller or Action.  
RouteArea and RoutePrefix Attribute are also identified in the Asp.Net.  
It also automatically resolves the default value specified on the route and, when the parameter value is not passed in, the default value specified on the route would be passed.  
However, route constraints are not resolved.  

## 1.10 Can the description of the class, or class properties, or action, or Action parameters be exported?

Yes.  
By default, the software automatically scans the Xml in the assembly directory or the directory specified by AssemblyXmlDirPath in the Json export configuration.  
Description are automatically exported to the resulting TypeScript code.  
If you do not want to export comments, you can specify ExportRemark in the Json export configuration as false.  
If exportRemark is not specified as false, but the description for the export target cannot be found, the "withour remark" is used as the description.

## 1.11 How does Action with the same name but different parameters export?

Action with the same name but different parameters needs to define different routes or HttpMethod;  
However, methods with the same name but different parameters cannot be defined in TypeScript, so we can only define methods with multiple different names;  
The program produces several methods with different names based on the parameter name.  
For example  

```csharp
[System.Web.Http.Route("api/values/{id?}")]
public class TestPrefixValuesController : ApiController
{
    [System.Web.Http.Route("api/Get/{id?}")]
    public IEnumerable<string> Get()
    {
        return new string[] { "value1", "value2" };
    }

    public string Get(int id)
    {
        return "value";
    }
}
```

```typescript
// tslint:disable-next-line:class-name
export class TestAreaTestPrefixValuesController extends Hongbo.HongboRootControl {
    /** define the constructor of TestAreaTestPrefixValuesController */
    constructor() {
        super();
        this.controlOption= {
            controlTypeName: "TestAreaTestPrefixValuesController",
            controlMode: Hongbo.EnumControlMode.WebApi,
            environment: Hongbo.EnumEnvironment.AspNet,
            routeDefine: {}
        };
    }
    /** without remark */
    Get(): Promise<Array<Entitys.Null_Or_String>> {
        let actionInfo: Hongbo.HongboRootAction = new Hongbo.HongboRootAction();
        actionInfo.httpMethod = {"IsHttpGet":true};
        actionInfo.inParameterDefines = [];
        return this.callAction(actionInfo);
    }
    /** without remark
     *  @param id without remark
     */
    GetById(id: number): Promise<Entitys.Null_Or_String> {
        let actionInfo: Hongbo.HongboRootAction = new Hongbo.HongboRootAction();
        actionInfo.httpMethod = {"IsHttpGet":true};
        actionInfo.inParameterDefines = [{"fromDefine":{},"name":"id"}];
        actionInfo.inParameterDefines[0].value = id;
        return this.callAction(actionInfo);
    }    
}
```

## 1.12 Will the interface be exported?

By default, interfaces are not exported.  
However, if the interface is the return parameter type of an Action, or if the interface is a property of a class to be exported, the interface is exported to the client.  
Note, however, that for interfaces, the program does not consider the inheritance of the interface, but exports all the properties contained in the interface directly to avoid exporting too many interface definitions.  
If the interface implemented by a class is exported as TypeScript, the code for the implement interface is added when the class is exported as TypeScript.  

## 1.13 Will the server-side-defined constants be exported?

Not export constant fields by default.  
If you want export the constant fileds, you need set the ExportConstDefine to true in the export configuration json file.  

## 1.14 Will the enumeration type be exported? What will be the default value?

The enumeration type is exported.  
By default, the property of the enumeration type will use the first value of the enumeration type as the default value for the enumerated property.  

## 1.15 If the constructor of the server-side class specifies a default value for the property, can this default value be exported when exported as TypeScript?

Yes.  
The software searches for an empty constructor for a class and builds an instance of the class based on it, exporting the property of that instance as the default value for the constructor corresponding to the property in typeScript code.

## 1.16 Can generic classes on the server side be exported?

Yes.  
TypeScript supports generic class definitions, but note that TypeScript does not support class definitions with the same name but with different number generic parameters.  
If the server-side definition has two classes with the same name but with different number generic parameters that need to be exported, the export will take the form of the following:

```csharp
public class GenericEntity<TModel> 
{ 
    public TModel Tm { get; set; }
}
public class GenericEntity<TModel, KModel> : GenericEntity<TModel>
{
    public KModel Km { get; set; }
}
```

Export will become the following form, that is, depending on the number of generic parameters, and with the identification of the number of generic parameters suffix;

```typescript
export class GenericEntity_1<TModel> 
{ 
    Tm: TModel;
}
export class GenericEntity_2<TModel, KModel> : GenericEntity_1<TModel>
{
    Km: KModel
}
```

However, if there are no other generic types with the same name but different number of generic parameters, the original name is retained.  
That is, if, in the above example, GenericEntity < TModel, KModel >, when exporting 
The original name, GenericEntity< TModel, KModel > remains

```csharp
public class GenericEntity<TModel> 
{ 
    public TModel Tm { get; set; }
}
```

When there are no other generic types with the same name but different number of generic parameters, the original name is preserved;

```typescript
export class GenericEntity<TModel> 
{ 
    Tm: TModel;
}
```

## 1.17 Can I add a custom Header when I send a request to the server?

OK.  
Just call the __HongboRootControl.SetGlobalBeforeRequest__ function.  
This static functions have three parameters:
__url__ -- the url of the request
__content__ -- a instance of IMethodBodyHeader interface.
> headers, body, method in content will act directly as headers, data, method properties in request.  

__request__ -- depending on the request library, request will correspond to different types.  
For example, when Axios, request is an instance of the Axios RequestConfing class.  

If you need to upload additional parameters, such as a certificate, you can add a certificate directly by  manipulating request (when using Axios library, it will be a instance of the AxiosRequestConfing class).  

```typescript
import * as Root from '@/auto/control';
import { AxiosRequestConfig } from "axios";

Root.Hongbo.HongboRootControl.SetGlobalBeforeRequest((
    url: string, 
    content: Root.Hongbo.IMethodBodyHeader, 
    request:  AxiosRequestConfig) => {
        content.headers["token"] = "aflgia"; // add a custom header to all requests.
        return request;
});
```

## 1.18 How do I make an action change request under a controller alone?

OK.
Using an instance of the controller, you can call its __setRequestPrehandleFunction__ function.  
SetRequestPrehandleFunction has 2 parameters:  
__prehandeRequest__: see the description of HongboRootControl.SetGlobalBeforeRequest above;
__prehandleOption__: is an enumerated value.  

a. EnumPreHandleOption.replaceGlobalForEver
> the preprocessor set by this function will always replace the preprocessor set by HongboRootControl.SetGlobalBeforeRequest;  
>so, the preprocessor set by HongboRootControl.SetGlobalBeforeRequest will not be called;

b. EnumPreHandleOption.replaceGlobalTemp
> the preprocessor set by this function will replace the preprocessor set by HongboRootControl.SetGlobalBeforeRequest ;  
> so, the preprocessor set by HongboRootControl.SetGlobalBeforeRequest will not be called;  
> After this call is complete, the preprocessors set by this function will be cleared;  
> that is, if not reset, the followed web reqiest will process the request using the preprocessor set by HongboRootControl.SetGlobalBeforeRequest  

c. EnumPreHandleOption.beforeGlobal
> The preprocessor set by this function setting will be called before the preprocessor set by HongboRootControl.SetGlobalBeforeRequest;

d. EnumPreHandleOption.afterGlobal
> The preprocessor set by this controller setting will be called after the preprocessor set by HongboRootControl.SetGlobalBeforeRequest;

At any time, you can use __setRequestPrehandleFunction() of the controller instance to clear the preprocessors that were previously set by the controller.
  
```typescript
import * as Root from '@/auto/control';
import { AxiosRequestConfig } from "axios";

Root.Hongbo.HongboRootControl.SetGlobalBeforeRequest((
    url: string, 
    content: Root.Hongbo.IMethodBodyHeader, 
    request:  AxiosRequestConfig) => {
        content.headers["token"] = "aflgia"; // add a custom header to all requests.
        return request;
});
Root.TsGenAspnetExample.Controllers.NoAnyAttrWebapiInstance.setRequestPrehandleFunction((
    url: string, 
    content: Root.Hongbo.IMethodBodyHeader, 
    request:  AxiosRequestConfig   ) => {
        console.log(JSON.stringify(content)); // record the data sent before sending the request;;
        return request;
    }, Root.Hongbo.EnumPreHandleOption.beforeGlobal);
```

## 1.19 Can I intercept a response?

OK.  
For simplicity, the program does not expose the underlying network response data, but simply returns the data that should be processed;  
If you need to process based on the underlying network response data, contact the 873593@qq.com， we maybe added later.  
The HongboRootControl.SetGlobalResponsePrehandleFunction function is used to define the interception of all response data.

__url__ -- the requested url,
__content__ -- an instance of the IMethodBodyHeader interface that sends data to the server and contains
 headers, body, method
__resultPromise__ -- an instance of The Promise < any > that always receives data asynchronously when receiving responses from the server;

```typescript
Root.Hongbo.HongboRootControl.SetGlobalResponsePrehandleFunction((url, content, resultPromise) => {
    return resultPromise.then((data) => {
        let result: Entitys.TsGenAspnetExample.Models.Person = data as Entitys.TsGenAspnetExample.Models.Person;
        let pos = result.Name?.indexOf("Yongxin Wang")??0;
        if ( pos>= 0) {
          alert("" + pos + " Enter the error handle"); // judge the result and enter the error.
          return Promise.reject(result);
        }
        else {        
          return Promise.resolve(result);
        }
    });
});
```

Like the requested intercept, the controller can also intercept the response individually using the setResponsePrehandleFunction function.

setResponsePrehandleFunction has two parameters:  
__prehandleResponse__:  same as the paramater of HongboRootControl.SetGlobalResponsePrehandleFunction above.
__prehandleOption__: is an enumerated value. same as the second parameter of setRequestPrehandleFunction function above.

At any time, you can use the __setResponsePrehandleFunction() to clear the functions that were previously set by the controller to preprocess the response.
