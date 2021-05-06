
[TOC]
# FAQ

## 什么是 NetAutoTsExport

NetAutoTsExport 是一个程序，它能根据Json输入设置将服务端 .Net环境下 Controller 中的 Action 转换为客户端的
TypeScript 调用代码。  
在转换过程中，它将尽量避免导出 Action 所不需要使用到的类以节省客户端代码。

## 为什么导出的 TypeScript 包含大量的 type 定义?

在服务器端，当一个变量指向一个普通的 C#类时，这个变量可以赋值为 null;  
但是在 TypeScript中，没有这种机制;  
而如果使用, `entityProp?: Entity`  类似属性定义时,当未在构造函数中指定 entityProp 的值时,  
entityProp 将是 undefined。  
对一个属性赋值 undefined,这可能导致一些问题，例如在 Vue中，这将导致无法绑定并监听这个属性的变化;
而将属性赋值给 null,可以正常绑定并监听这个属性。  
所以我们不能使用 `entityProp?: Entity` 形式来定义可能为 null 的属性，  
而需要使用 `entityProp: null | Entity` 形式来定义属性的类型。
所以，我们在导出的 TypeScript 中首先定义了可能为 null 的类型定义，
例如，

```typescript
// 默认导出
export type Null_Or_<TElement> =  null | TElement;
// 默认导出
export type Null_Or_ArrayGeneral<TElement> =  Null_Or_<Array<TElement>>;
// 在 中定义 空或者 string
export type Null_Or_String = null | string;
// 在 中定义 空或者 System.Text.DecoderFallback
export type Null_Or_DecoderFallbackInSystemText = Null_Or_<System.Text.DecoderFallback>;
```

所有的 type 定义都将使用 Null_Or_作为前缀，  
然后是类名称 + In + 类的命名空间， 例如， Null_Or_DecoderFallbackInSystemText。  
但如果类在 TypeScript 中有对应的原生类型，则直接使用 Null_Or_原生类型，例如 Null_Or_String 形式。

## 会导出哪些内容?

软件将扫描给定目录下的所有程序集，从程序集中寻找所有的控制器和控制器下的Action，
根据 Action，将 Action的输入参数和返回参数的类型导出到 TypeScript，并且将 控制器和Action导出。
软件也将扫描给定目录下的Xml文件，寻找导出内容的注释内容，一并导出到 TypeScript代码中。

## 导出为什么会分为2个文件?

导出的 TypeScript 将分为2个文件。  
一个名称是 entity.ts, 存放所有被 Action 所使用到的类型。  
一个名称是 control.ts, 存放所有的 Controller 和 Action。
分为2个文件是为了能够让用户能够单独使用 entity.ts 中的类，而无需访问 control.ts。

## 有一个类未被任何 action 作为输入输出参数使用到，可以导出吗?

可以。  
a. 定义一个 Attribute 的子类，  
b. 将 Attribute子类 指定到待导出的类  
c. 指定 Attribute子类 的名称指定给 导出Json配置中的 __AttrForExportModel__ 属性。  
如果有很多类似上面这样的类需要导出时，可以如上定义一个额外的类，然后在这个类内部定义待导出的类的属性，以避免对代码进行太多的改动。  
甚至，你可以定义一个新的项目，然后将上述的 Attribute子类以及额外的类定义在这个项目中，以便不改动原有的项目。  
例如，

```csharp
/// <summary>
/// 定义一个标注类，包含此标注的类将产生 TypeScript 定义，
/// 注意，需要指定导出配置中的 AttrForExportModel 为 AlwaysExportAttribute
/// </summary>
public class AlwaysExportAttribute : Attribute
{
}
/// <summary>
/// 类始终产生 TypeScript 定义，即使其未被任何 Action 使用
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

## 有一个类被某一个 action 作为输入输出参数使用到呢，可以不导出吗?

可以。
a. 定义一个 Attribute 的子类，  
b. 将 Attribute子类 指定到不想导出的类  
c. 指定 Attribute子类 的名称指定给 导出Json配置中的 __AttrsForExceptProperty__ 属性。  
对于，不会导出但是又被某一个 Action 作为输入/输出参数所使用到的类，参数类型将使用 any 进行替代。
例如，

```csharp
/// <summary>
/// 定义一个标注类，包含此标注的类将不会产生 TypeScript 定义，
/// 注意，需要指定导出配置中的 AttrsForExceptProperty 为 AlwaysIgnoreAttribute
/// </summary>
public class AlwaysIgnoreAttribute : Attribute
{
}
/// <summary>
/// 类不会产生 TypeScript 定义，即使其被某一个 Action 使用
/// </summary>
[AlwaysIgnore]
public class ExportHolderForExcept
{
    ......
}
```

## 可以不导出某一个 Action 或者不导出某一个 Controller 吗?

可以。  
a. 定义一个 Attribute 的子类。  
b. 将 Attribute子类 指定到不想导出的 Action 或者 Controller 上。
c. 指定 Attribute子类 的名称指定给 导出Json配置中的 __AttrsForExceptProperty__ 属性。  

## Dictionary<object, Entity> 形式将如何导出?

Dictionary<object, Entity>  将导出到 any;  
而对于能够映射为 Record 类型的 Dictionary，则将导出为 Record;  
TypeScript 中， Record支持 string | number | symbol 作为 Record的键。  
所以，对于 Dictionary<string, Entity>, Dictionary<number, Entity> 类型的才会导出为 Record类型。  
所有的 Dictionary 都不会导出为 map 类型，因为 map类型无法使用 JSON.stringify 正常进行序列化操作。

## 如何处理控制器路由或者Action上的路由?

导出软件能够正确识别定义在 Controller 上的路由 或者定义在 Action 上的路由。  
在 Asp.Net中，还能识别 RouteArea 和 RoutePrefix Attribute。  
并能够自动解析路由上指定的默认值，在未传入参数值时，自动传入路由上指定的默认值。  
但不会解析路由约束。  

## 类的说明、类属性说明、控制器说明、Action说明、Action参数说明能否导出?

能。  
默认下，软件将自动扫描程序集目录下的 Xml 或者 Json导出配置中 AssemblyXmlDirPath 指定的目录，  
并自动导出注释到产生的 TypeScript 代码中。  
如果不想导出注释，可以指定 Json导出配置中的 ExportRemark 为 false。  
如果没有指定 ExportRemark 为 false, 但是找不到导出目标的注释时，将使用 withour remark 字符串作为注释。 

## 同名但是参数不同的 Action 如何导出?

同名但是参数不同的 Action 需要定义有不同的路由或者 HttpMethod;  
但是在 TypeScript 中不能定义同名但是参数不同的方法，因此我们只能定义多个不同名称的方法；  
程序将根据参数名称产生多个不同名称的方法。  
例如，  

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

## 接口是否会导出?

默认情况下，接口不会导出。
但如果接口作为某一个 Action 的返回参数类型，或者接口作为某一个待导出类的属性时，接口将会导出到客户端。  
但注意，对于接口,程序不会考虑接口的继承性，而是直接导出接口所包含的所有属性直接导出，以避免导出太多的接口定义。  
如果某一个类所实现的接口会导出为 TypeScript，则类导出为 TypeScript时，将会添加 implements 此接口的代码。

## 服务器端定义的常量是否会导出?

不会。后续可能会导出常量定义。

## 枚举类型是否会导出?枚举类型的属性默认值将会是什么?

枚举类型会导出。
枚举类型的属性将会使用枚举类型的第一个值作为枚举属性的默认值。

## 如果服务器端类的构造函数给属性指定了默认值,导出为 TypeScript 时,此默认值能否导出?

能。  
软件将搜索类的空构造函数，并根据此构造函数构建类的实例，在导出时将此实例的属性作为 TypeScript 代码中的构造函数对应属性的默认值。

## 服务器端的泛型类能否导出?

能。  
TypeScript支持泛型类定义，但是注意，TypeScript不支持同名但是带不同个数泛型参数的类定义。  
如果服务器端定义有 2个同名但是带不同个数泛型参数的类需要导出， 则导出时将会转变为如下形式:

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

导出时将变为如下形式,即根据泛型参数个数的不同, 而带有标识泛型参数个数的后缀;

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

但如果不存在其他的同名但是泛型参数个数不同的泛型类型时，则依旧会保留原始名称。  
即如果上述例子中，GenericEntity<TModel, KModel>, 则导出 GenericEntity&lt;TModel> 时，
依旧保留原始名称，即 GenericEntity&lt;TModel>

```csharp
public class GenericEntity<TModel> 
{ 
    public TModel Tm { get; set; }
}
```

不存在其他的同名但是泛型参数个数不同的泛型类型时，则保留原始名称;

```typescript
export class GenericEntity<TModel> 
{ 
    Tm: TModel;
}
```

## 在向服务器发送请求时, 是否可以添加自定义的 Header?

可以。  
调用  __HongboRootControl.SetGlobalBeforeRequest__ 函数即可。
静态函数有三个参数：
__url__ -- 请求的 url,
__content__ -- IMethodBodyHeader 接口实例
> content 中的 headers, body, method, url 将直接作为 request 中的 headers, data, method, url属性。

__request__ -- 根据请求库的不同，request 将分别对应到不同的类型。  
例如，Axios 时，request 是 AxiosRequestConfing类实例。

如果你需要上传其他参数，例如证书，可直接操作 request （例子为 AxiosRequestConfing类 实例)添加证书。

```typescript
import * as Root from '@/auto/control';
import { AxiosRequestConfig } from "axios";

Root.Hongbo.HongboRootControl.SetGlobalBeforeRequest((
    url: string, 
    content: Root.Hongbo.IMethodBodyHeader, 
    request:  AxiosRequestConfig) => {
        content.headers["token"] = "aflgia"; // 给所有请求添加自定义header。
        return request;
});
```

## 单独给某一个控制器下的 action 变更请求？

可以。
使用控制器的实例，调用其 setRequestPrehandleFunction 函数即可。
setRequestPrehandleFunction 有2个参数:  
__prehandeRequest__:  和上面 HongboRootControl.SetGlobalBeforeRequest 的参数一致；
__prehandleOption__: 是一个枚举值  
其值可以取如下的值:    
a. EnumPreHandleOption.replaceGlobalForEver
> 所设置的预处理函数在控制器中将一直替换 HongboRootControl.SetGlobalBeforeRequest 设置的预处理函数;  
> 即HongboRootControl.SetGlobalBeforeRequest 设置的预处理函数不会被调用;

b. EnumPreHandleOption.replaceGlobalTemp
> 本控制器设置所设置的预处理函数在控制器中将替换 HongboRootControl.SetGlobalBeforeRequest 设置的预处理函数;  
> HongboRootControl.SetGlobalBeforeRequest 设置的预处理函数不会被调用;  
> 本次调用完成后，将清除本控制器所设置的预处理函数；  
> 即如果不重新设置，下一次控制器将使用 HongboRootControl.SetGlobalBeforeRequest 设置的预处理函数 处理请求  

c. EnumPreHandleOption.beforeGlobal
> 本控制器设置所设置的预处理函数将在 HongboRootControl.SetGlobalBeforeRequest 设置的预处理函数之前调用;

d. EnumPreHandleOption.afterGlobal
> 本控制器设置所设置的预处理函数将在 HongboRootControl.SetGlobalBeforeRequest 设置的预处理函数之后调用;

任何时候，都可以使用 __setRequestPrehandleFunction()__ 清除此前控制器所设置的预处理函数。
  
```typescript
import * as Root from '@/auto/control';
import { AxiosRequestConfig } from "axios";

Root.Hongbo.HongboRootControl.SetGlobalBeforeRequest((
    url: string, 
    content: Root.Hongbo.IMethodBodyHeader, 
    request:  AxiosRequestConfig) => {
        content.headers["token"] = "aflgia"; // 给所有请求添加自定义header。
        return request;
});
Root.TsGenAspnetExample.Controllers.NoAnyAttrWebapiInstance.setRequestPrehandleFunction((url: string, content: Root.Hongbo.IMethodBodyHeader, request:  AxiosRequestConfig) => {
    console.log(JSON.stringify(content)); //发送请求之前，记录一下发送的信息;
    return request;
}, Root.Hongbo.EnumPreHandleOption.beforeGlobal);
```

## 能否拦截响应?

可以.  
为简单起见，程序不会暴露底层的网络响应数据,而只是返回应该处理的 data;  
如果你需要根据底层网路响应数据进行处理，请联系 873593@qq.com。
例如，以Axios为例，拦截全部响应可以使用如下代码，
HongboRootControl.SetGlobalResponsePrehandleFunction 函数用于定义全部响应数据的拦截。

__url__ -- 请求的 url,
__content__ -- IMethodBodyHeader 接口实例，发送到服务器的数据，包含
 headers, body, method
__resultPromise__ -- Promise&lt;any> 的实例, 从服务器接收响应时，总是使用异步方式接收数据;

```typescript
Root.Hongbo.HongboRootControl.SetGlobalResponsePrehandleFunction((url, content, resultPromise) => {
    return resultPromise.then((data) => {
        let result: Entitys.TsGenAspnetExample.Models.Person = data as Entitys.TsGenAspnetExample.Models.Person;
        let pos = result.Name?.indexOf("Yongxin Wang")??0;
        if ( pos>= 0) {
          alert("" + pos + " 进入错误处理模式(Enter the error handle");
          return Promise.reject(result);
        }
        else {        
          return Promise.resolve(result);
        }
    });
});
```

和请求的拦截雷同，控制器使用 setResponsePrehandleFunction 函数也可以对响应进行单独拦截。

setResponsePrehandleFunction 有2个参数:  
__prehandleResponse__:  和上面 HongboRootControl.SetGlobalResponsePrehandleFunction 的参数一致；
__prehandleOption__: 是一个枚举常量, 和上面 setRequestPrehandleFunction 函数中的第2个参数有一致含义。

任何时候，都可以使用 __setResponsePrehandleFunction()__ 清除此前控制器所设置的对响应进行预处理的函数。
