
<style>.md-toc {z-index: 999; display: block; position: fixed;left: 6px;top:10px;width:350px;word-wrap: break-word; /* word-break:break-all; */ overflow: scroll; } .md-toc-item { margin-right: 40px; }   </style>
[TOC]
# 1. NetAutoTsExport

本程序能够将 Asp.Net 或者 .NetCore项目程序集下的控制器以及其输入、输出参数导出为 Typescript 客户端形式，以便于Http客户端调用;  
__注意，本程序不是免费软件。__

 查看 __[Faq] <https://yanqingmao.github.io/NetAutoTsExport/html/faq.zh-cn.html>__  
see __[English Readme] <https://yanqingmao.github.io/NetAutoTsExport/html/README.html>__  
  
## 1.1 程序版本

本程序有三个版本

### 1.1.1 Asp.Net(4.5 Or Greater)  

支持 .NetFramework 4.5 或者以上版本.  

<https://yanqingmao.github.io/NetAutoTsExport/html/NetAutoTsExport_NetFramework_Console.zip>  
命令行方式，需要指定导出配置文件的路径.  

<https://yanqingmao.github.io/NetAutoTsExport/html/NetAutoTsExport_NetFramework_WinForm.zip>  
Windows 窗口方式运行.  

### 1.1.2 .NetCore3.1

支持 .NetCore3.1 或者以下版本  

<https://yanqingmao.github.io/NetAutoTsExport/html/NetAutoTsExport_NetCore3_Console.zip>  
命令行方式，需要指定导出配置文件的路径.  

<https://yanqingmao.github.io/NetAutoTsExport/html/NetAutoTsExport_NetCore3_WinForm.zip>  
Windows 窗口方式运行.  

### 1.1.3 .Net5

支持 .Net5 或者以下版本  

<<https://yanqingmao.github.io/NetAutoTsExport/html/NetAutoTsExport_Net5_Console.zip>  
命令行方式，需要指定导出配置文件的路径.  

https://yanqingmao.github.io/NetAutoTsExport/html/NetAutoTsExport_Net5_WinForm.zip>  
Windows 窗口方式运行.  

## 1.2 Json配置参数说明

### 1.2.1 AssemblyDirPath

__必须指定。__  
指定待扫描的程序集的目录。  
当此目录下存在包含程序集注释的XML文件时，XML文件将一并被扫描以便产生注释。  
注意，__只能指定一个目录路径__。
例如，  
`K:\TotalDevelopNew\TsGenAspnetExample\bin`

### 1.2.2 AssemblyXmlDirPath

__可选__  
指定待扫描的包含程序集注释的XML文件的目录。  
注意，__只能指定一个目录路径__。  
例如，  
`K:\TotalDevelopNew\TsGenAspnetExample\bin`  

### 1.2.3 BaseUrl

__必须指定__  
Web项目的基Url，所有控制器都将根据此Url添加后缀路径访问。  
任何时候，你都可以通过如下代码指定 baseUrl, 但我们建议你在 Json 配置文件中指定。

```typescript
import * as Root from '@/auto/control'; 
...
Root.HongboRootControl.BaseUrl = "http://localhost/x";
```

例如，BaseUrl 给定如下的值  
`http://localhost/TsGenAspnetExample`

### 1.2.4 DefaultMvcRoute

__可选__  其默认值是  `{controller}/{action}/{id?}`。  
默认的MVC路由。请查看 RouteConfig.cs 或者 Startup.cs 代码来找到 默认 MVC 路由值定义。  
任何时候，你都可以通过如下代码指定 baseUrl, 但我们建议你在 Json 配置文件中指定。

```typescript
import * as Root from '@/auto/control'; 
...
Root.HongboRootControl.DefaulMvctRoute = "{controller}/{action}/{id?}";
```

### 1.2.5 DefaultWebapiRoute

__可选__， 其默认值将是 `api/{controller}/{id?}`
默认的 WebApi 路由。请查看 WebapiConfig.cs 或者 Startup.cs 代码来找到默认 WebApi 路由值定义。  
任何时候，你都可以通过如下代码指定 baseUrl, 但我们建议你在 Json 配置文件中指定。

```typescript
import * as Root from '@/auto/control'; 
...
Root.HongboRootControl.DefaulWebapitRoute = "api/{controller}/{id?}";
```

### 1.2.6 AllowStringToNull

字符串是否允许为null。  默认值为 true。  
如果为 true, 表示字符串允许为 null;  
如果为 false, 则表示不允许字符串为 null;  
这个值影响到字符串属性在 Typescript中的定义。  
例如，

```typescript
export class Entity {
    constructor() {
    }
    //propB: null | string; // when AllowStringToNull set to true,
    propB:  string;         // when AllowStringToNull set to false,
}
```

### 1.2.7 StringDefaultEmpty

字符串是否默认为null。 默认值为 true。  
如果为 true 或者 AllowStringToNull 为false 时, 字符串属性默认将是 空字符串;  
如果为 false, 则如果 AllowStringToNull 为 true 时，其默认值将是 null;  
这个值影响到字符串属性在 Typescript中的定义。  
例如，  

```typescript
export class Entity {
    constructor() {         
        // this.propB = null;  // when AllowStringToNull=true & StringDefaultEmpty=false
        this.propB = '';  // when StringDefaultEmpty=true or AllowStringToNull=false
    }
    //propB: null | string; // when AllowStringToNull set to true,
    propB:  string;         // when AllowStringToNull set to false,
}
```

### 1.2.8 BuildRefererInstance

是否构建关联对象的实例。 默认为 true。  
注意，如果发现循环依赖引用时，即使此属性设置为 true, 属性的默认值还将会是 null。  
例如，

```typescript
export class EntityA {
    constructor() { 
        this.propB = new EntityB();  // when BuildRefererInstance set to true,
        // this.propB = null;        // when BuildRefererInstance set to false,
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

是否导出实体类、类属性、控制器、Action、Action的输入参数的注释, 默认为 true。  
需要能够找到包含注释的XML文件。  

### 1.2.10 ArrayCanBeNull

是否允许数组为 null, 默认为 false;  
当为 true 时，如果属性可以转换为数组，可以将此属性指定为 null;  
此属性影响属性的 Ts定义;  

```typescript
export class EntityA {
    constructor() { 
        this.propB = [];          // when ArrayCanBeNull set to false,
        // this.propB = null;     // when ArrayCanBeNull set to true,
    }
    propB: Array<string>;        // when ArrayCanBeNull set to false,
    // propB: Null_Or_Array<string>;   // when ArrayCanBeNull set to true,
}
```

### 1.2.11 ProductTypeNamePropeprty

是否在导出的实体类中额外增加一个属性（属性名称固定为 __hbTypename__) 来描述原始类在服务端的名称；  
默认为 true。  
当你在服务器端需要根据类型动态处理时，此属性有用。  
例如, 当 ProductTypeNamePropeprty=true时  

```typescript
export class EntityA {
    constructor() { 
        this.hbTypename = "TsgenExample.Models.EntityA";
    }
    hbTypename: string;
}
```

### 1.2.12 ProductEntityInterface

是否产生实体接口。  默认为false  
如果为true,则每一个实体类都将产生一个接口,实体类名称作为接口名称,而实体类将实现此接口,其名称是实体类名称加上Imp。  
如果为false,不会产生接口定义，并且实体类名称直接作为Ts导出的类名称;  
例如, 当 ProductEntityInterface=true 时  

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

 当 ProductEntityInterface=false 时  

```typescript
    export class PlaySchemaFullItemGroupImpl {
        BeginDateTime: Date;
        constructor() {
            this.BeginDateTime = new Date(-62135596800000+0800);
        }
    }
```

### 1.2.13 OutputFieldSourceInConstruct

是否产生字段源说明。默认为 false。  
如果为true,Ts构造函数中将通过注释说明每一个字段的来源。  
如果为false,不会产生。  
例如, 当 OutputFieldSourceInConstruct=true时  

```typescript
    export class PlaySchemaFullItemGroupImpl {
        BeginDateTime: Date;
        constructor() {
            // EhayWebApi -- EhayWebApi.Model -- PlaySchemaFullItemGroup -- BeginDateTime
            this.BeginDateTime = new Date(-62135596800000+0800);
        }
    }
```

### 1.2.14 ProductAntiJqueryParamInConstruct

是否产生防止 JQuery.param 的调用调用代码。 默认为 false。  
JQuery.param 方法将调用类的构造函数，但是传入 null 值进来;  
此时可能会产生异常。  
例如, 当 ProductAntiJqueryParamInConstruct=true时  

```typescript
constructor() {
    if (!this) return; // sometime jquery.param will call this contructor,but transfer null to it
}
```

### 1.2.15 DefineStaticControlStance  

是否定义控制器的静态实例。默认为 true。  
控制器静态实例定义在命名空间的底部。  
对于抽象类、或者定义泛型参数的泛型类，不会构建此控制器的实例。  
例如，

```typescript
export namespace EhayWebApi.Controllers {
    ...
    /** define a static instance of RfidCupController */
    export const RfidCupInstance: RfidCupController = new RfidCupController();
}
```

### 1.2.16 UseCamelPropertyName

导出类的属性名称是否使用 camel方式；  
如果为 true, 类的属性名称使用 camel方式。  
如果为 true, 类的属性保留原始名称。  
例如， 如果 UseCamelPropertyName = true  

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
    name: Null_Or_String; // Name 将变为 name
}
```

### 1.2.17 LimitControlTypes

限制需要导出的控制器，使用正则表达式方式。  
如果定义有合法的正则表达式，则只有 "命名空间.类名称 " 匹配此正则表达式的控制器才会导出。  
例如的是，如果某一个控制器需要导出，则其父控制器将忽略此限制而将一并导出。  
例如，  
`LimitControlTypes=__^Ehay[.]Controllers[.].*$`  
限制只有 Ehay.Controllers 命名空间下的控制器才会导出。

### 1.2.18 AttrForExportModel  

定义需要产生 TypeScript 定义的类的标注。默认为 null  
当某一个类没有被任何 Action 通过输入输出参数 使用，默认下这个类不会产生 Typescript 定义。  
可以定义一个 C# 标注类，并将此标注定义在 类上，将标注类的名称赋予  AttrForExportModel, 则此类会产生 TypeScript 定义。  
只需要标注类的名称，不需要命名空间；  
可以定义多个标注类，之间使用逗号间隔。  
例如，AttrForExportModel=__AlwaysExportAttribute__ 

```c#
/// <summary>
/// 定义一个标注类，包含此标注的类将产生 TypeScript 定义
/// </summary>
public class AlwaysExportAttribute : Attribute
{
}
/// <summary>
/// 实体始终产生 TypeScript 定义，即使其未被任何 Action 使用
/// </summary>
[AlwaysExport]
public class EntityAlwaysExport
{
}
```

### 1.2.19 AttrsForExceptProperty

定义产生 TypeScript 定义的类的标注。默认为 null；  
当某个类被某一个 Action 作为输入输出参数使用时，默认将产生 TypeScript 定义。  
通过上述标注，可以让这个类不产生 TypeScript 定义，而使用 any 代替;  
只需要标注类的名称，不需要命名空间；  
可以定义多个标注类，之间使用逗号间隔。  
例如，AttrsForExceptProperty=__AlwaysIgnoreAttribute__

```c#
/// <summary>
/// 定义一个标注类，包含此标注的类将不产生 TypeScript 定义
/// </summary>
public class AlwaysIgnoreAttribute : Attribute
{
}
/// <summary>
/// 实体始终不会产生 TypeScript 定义，即使其被某一个 Action 使用
/// </summary>
[AlwaysIgnore]
public class EntityAlwaysDontExport
{
}
```

### 1.2.20 AttrsForJsonResultTypes

定义某一个 Action 的输出类型。  
当某一个 Action 返回 JsonResult 时，其返回类型只能转换为 any 类型。  
通过上述标注，可以指定Action 实际返回的类型。  
标注应该带有 Type ResultType 属性，以便指定 Action 实际返回的类型。  
例如， AttrsForJsonResultTypes=__JsonResultTypeAttribute__  

```c#
/// <summary>
/// 定义一个标注类，其 ResultType 指定 Action 返回的结果类型。
/// </summary>
public class JsonResultTypeAttribute : Attribute
{
        public JsonResultTypeAttribute()
        {
        }
        public Type ResultType { get; set; }
}
public class Dog 
{
    public string Name { get; set; }
}
public class HomeController : Controller
{
        /// <summary>
        /// 通过 JsonResultType 指定，返回将是 Dog 的实例
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

### 1.2.21 SendRequestType  

发送 Http 请求的客户端库。 暂时支持如下的库。  

#### 1.2.21.1 Axios

   see <http://www.axios-js.com/>  

#### 1.2.21.2 Jquery

   see <https://jquery.com/>  

#### 1.2.21.3 BrowserFetch

   see <https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API>  

#### 1.2.21.4 UniAppRequest

   see <https://uniapp.dcloud.io/api/README>  

#### 1.2.21.5 WechatLittleApp  

   see <https://developers.weixin.qq.com/miniprogram/dev/api/>  

不同的库，将会产生不同的 import 引用 和 发送请求的 TypeScript 代码；  

### 1.2.22 ExportDirPath  

定义导出的 TypeScript 文件的目录  
