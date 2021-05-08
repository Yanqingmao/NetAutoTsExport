// 默认导出
export type Null_Or_<TElement> =  null | TElement;
// 默认导出
export type Null_Or_ArrayGeneral<TElement> =  Null_Or_<Array<TElement>>;
// 在 中定义 空或者 string
export type Null_Or_String = null | string;
// 在 中定义 空或者 System.Xml.Linq.XDocument
export type Null_Or_XDocumentInSystemXmlLinq = Null_Or_<System.Xml.Linq.XDocument>;
// 在 中定义 空或者 System.Xml.Linq.XElement
export type Null_Or_XElementInSystemXmlLinq = Null_Or_<System.Xml.Linq.XElement>;
// 在 中定义 空或者 System.Xml.Linq.XNode
export type Null_Or_XNodeInSystemXmlLinq = Null_Or_<System.Xml.Linq.XNode>;
// 在 中定义 空或者 System.Xml.Linq.XAttribute
export type Null_Or_XAttributeInSystemXmlLinq = Null_Or_<System.Xml.Linq.XAttribute>;
// 在 中定义 空或者 System.Xml.Linq.XName
export type Null_Or_XNameInSystemXmlLinq = Null_Or_<System.Xml.Linq.XName>;
// 在 中定义 空或者 System.Xml.Linq.XNamespace
export type Null_Or_XNamespaceInSystemXmlLinq = Null_Or_<System.Xml.Linq.XNamespace>;
// 在 中定义 空或者 System.Xml.Linq.XDeclaration
export type Null_Or_XDeclarationInSystemXmlLinq = Null_Or_<System.Xml.Linq.XDeclaration>;
// 在 中定义 空或者 System.Xml.Linq.XDocumentType
export type Null_Or_XDocumentTypeInSystemXmlLinq = Null_Or_<System.Xml.Linq.XDocumentType>;
// 在 中定义 空或者 TsGenAspnetExample.Models.IName
export type Null_Or_INameInTsGenAspnetExampleModels = Null_Or_<TsGenAspnetExample.Models.IName>;
// 在 中定义 空或者 TsGenAspnetExample.Models.Manager
export type Null_Or_ManagerInTsGenAspnetExampleModels = Null_Or_<TsGenAspnetExample.Models.Manager>;
// 在 中定义 空或者 TsGenAspnetExample.Models.Person
export type Null_Or_PersonInTsGenAspnetExampleModels = Null_Or_<TsGenAspnetExample.Models.Person>;
// 在 中定义 空或者 TsGenAspnetExample.Models.Dog
export type Null_Or_DogInTsGenAspnetExampleModels = Null_Or_<TsGenAspnetExample.Models.Dog>;
// 在 中定义 空或者 TsGenAspnetExample.Models.WechatOrder
export type Null_Or_WechatOrderInTsGenAspnetExampleModels = Null_Or_<TsGenAspnetExample.Models.WechatOrder>;
// tslint:disable-next-line:max-line-length
// 在 中定义 空或者 TsGenAspnetExample.Models.GenericWorkFlow<Entitys.TsGenAspnetExample.Models.Dog,Entitys.TsGenAspnetExample.Models.EnumAnimalType>
// tslint:disable-next-line:max-line-length
export type Null_Or_GenericWorkFlowInTsGenAspnetExampleModels<TEntity,TState> = null | TsGenAspnetExample.Models.GenericWorkFlow<TEntity,TState>;
// 在 中定义 空或者 TsGenAspnetExample.Models.Animal
export type Null_Or_AnimalInTsGenAspnetExampleModels = Null_Or_<TsGenAspnetExample.Models.Animal>;
export namespace System {
    /** 输出 Tuple 元组类型 */
    // tslint:disable-next-line:class-name
    export class Tuple_1<T1 = {}> {
       Item1: T1 = {} as any;
    }

    /** 输出 Tuple 元组类型 */
    // tslint:disable-next-line:class-name
    export class Tuple_2<T1 = {},T2 = {}> extends Tuple_1<T1> {
       Item2: T2 = {} as any;
    }

    // tslint:disable-next-line:interface-name & class-name
    export interface ValueType {
    }
    export abstract class ValueTypeImpl implements ValueType {
        /** typename property */
        hbTypename?: string;
        constructor() {
            this.hbTypename = "System.ValueType";
        }
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface Void extends ValueType {
    }
    export class VoidImpl extends ValueTypeImpl implements Void {
        constructor() {
            super();
            this.hbTypename = "System.Void";
        }
    }
}
export namespace Hongbo.Basic.Systems {
    // tslint:disable-next-line:interface-name & class-name
    export interface CheckResult extends System.ValueType {
        ErrorReason: Null_Or_String;
        HasError: boolean;
    }
    export class CheckResultImpl extends System.ValueTypeImpl implements CheckResult {
        ErrorReason: Null_Or_String;
        HasError: boolean;
        constructor() {
            super();
            // : Hongbo.Basic -- Hongbo.Basic.Systems -- CheckResult -- ErrorReason
            this.ErrorReason = "";
            // : Hongbo.Basic -- Hongbo.Basic.Systems -- CheckResult -- HasError
            this.HasError = false;
            this.hbTypename = "Hongbo.Basic.Systems.CheckResult";
        }
    }
}
export namespace System.Xml {
    export enum XmlNodeType {
        None = 0,
        Element = 1,
        Attribute = 2,
        Text = 3,
        CDATA = 4,
        EntityReference = 5,
        Entity = 6,
        ProcessingInstruction = 7,
        Comment = 8,
        Document = 9,
        DocumentType = 10,
        DocumentFragment = 11,
        Notation = 12,
        Whitespace = 13,
        SignificantWhitespace = 14,
        EndElement = 15,
        EndEntity = 16,
        XmlDeclaration = 17,
    }
}
export namespace System.Xml.Linq {
    // tslint:disable-next-line:interface-name & class-name
    export interface XObject {
        BaseUri: Null_Or_String;
        Document: Null_Or_XDocumentInSystemXmlLinq;
        NodeType: System.Xml.XmlNodeType;
        Parent: Null_Or_XElementInSystemXmlLinq;
    }
    export abstract class XObjectImpl implements XObject {
        BaseUri: Null_Or_String;
        Document: Null_Or_XDocumentInSystemXmlLinq;
        NodeType: System.Xml.XmlNodeType;
        Parent: Null_Or_XElementInSystemXmlLinq;
        /** typename property */
        hbTypename?: string;
        constructor() {
            // : System.Xml.Linq -- System.Xml.Linq -- XObject -- BaseUri
            this.BaseUri = "";
            // : System.Xml.Linq -- System.Xml.Linq -- XObject -- Document
            this.Document = null;
            // : System.Xml.Linq -- System.Xml.Linq -- XObject -- NodeType
            this.NodeType = System.Xml.XmlNodeType.None;
            // : System.Xml.Linq -- System.Xml.Linq -- XObject -- Parent
            this.Parent = null;
            this.hbTypename = "System.Xml.Linq.XObject";
        }
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface XNode extends XObject {
        NextNode: Null_Or_XNodeInSystemXmlLinq;
        PreviousNode: Null_Or_XNodeInSystemXmlLinq;
    }
    export abstract class XNodeImpl extends XObjectImpl implements XNode {
        NextNode: Null_Or_XNodeInSystemXmlLinq;
        PreviousNode: Null_Or_XNodeInSystemXmlLinq;
        constructor() {
            super();
            // : System.Xml.Linq -- System.Xml.Linq -- XNode -- NextNode
            this.NextNode = null;
            // : System.Xml.Linq -- System.Xml.Linq -- XNode -- PreviousNode
            this.PreviousNode = null;
            this.hbTypename = "System.Xml.Linq.XNode";
        }
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface XNodeDocumentOrderComparer {
    }
    export class XNodeDocumentOrderComparerImpl implements XNodeDocumentOrderComparer {
        /** typename property */
        hbTypename?: string;
        constructor() {
            this.hbTypename = "System.Xml.Linq.XNodeDocumentOrderComparer";
        }
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface XNodeEqualityComparer {
    }
    export class XNodeEqualityComparerImpl implements XNodeEqualityComparer {
        /** typename property */
        hbTypename?: string;
        constructor() {
            this.hbTypename = "System.Xml.Linq.XNodeEqualityComparer";
        }
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface XContainer extends XNode {
        FirstNode: Null_Or_XNodeInSystemXmlLinq;
        LastNode: Null_Or_XNodeInSystemXmlLinq;
    }
    export abstract class XContainerImpl extends XNodeImpl implements XContainer {
        FirstNode: Null_Or_XNodeInSystemXmlLinq;
        LastNode: Null_Or_XNodeInSystemXmlLinq;
        constructor() {
            super();
            // : System.Xml.Linq -- System.Xml.Linq -- XContainer -- FirstNode
            this.FirstNode = null;
            // : System.Xml.Linq -- System.Xml.Linq -- XContainer -- LastNode
            this.LastNode = null;
            this.hbTypename = "System.Xml.Linq.XContainer";
        }
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface XElement extends XContainer {
        FirstAttribute: Null_Or_XAttributeInSystemXmlLinq;
        HasAttributes: boolean;
        HasElements: boolean;
        IsEmpty: boolean;
        LastAttribute: Null_Or_XAttributeInSystemXmlLinq;
        Name: Null_Or_XNameInSystemXmlLinq;
        NodeType: System.Xml.XmlNodeType;
        Value: Null_Or_String;
    }
    export class XElementImpl extends XContainerImpl implements XElement {
        FirstAttribute: Null_Or_XAttributeInSystemXmlLinq;
        HasAttributes: boolean;
        HasElements: boolean;
        IsEmpty: boolean;
        LastAttribute: Null_Or_XAttributeInSystemXmlLinq;
        Name: Null_Or_XNameInSystemXmlLinq;
        NodeType: System.Xml.XmlNodeType;
        Value: Null_Or_String;
        constructor() {
            super();
            // : System.Xml.Linq -- System.Xml.Linq -- XElement -- FirstAttribute
            this.FirstAttribute = null;
            // : System.Xml.Linq -- System.Xml.Linq -- XElement -- HasAttributes
            this.HasAttributes = false;
            // : System.Xml.Linq -- System.Xml.Linq -- XElement -- HasElements
            this.HasElements = false;
            // : System.Xml.Linq -- System.Xml.Linq -- XElement -- IsEmpty
            this.IsEmpty = false;
            // : System.Xml.Linq -- System.Xml.Linq -- XElement -- LastAttribute
            this.LastAttribute = null;
            // : System.Xml.Linq -- System.Xml.Linq -- XElement -- Name
            this.Name =  new XNameImpl();
            // : System.Xml.Linq -- System.Xml.Linq -- XElement -- NodeType
            this.NodeType = System.Xml.XmlNodeType.None;
            // : System.Xml.Linq -- System.Xml.Linq -- XElement -- Value
            this.Value = "";
            this.hbTypename = "System.Xml.Linq.XElement";
        }
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface XName {
        LocalName: Null_Or_String;
        Namespace: Null_Or_XNamespaceInSystemXmlLinq;
        NamespaceName: Null_Or_String;
    }
    export class XNameImpl implements XName {
        LocalName: Null_Or_String;
        Namespace: Null_Or_XNamespaceInSystemXmlLinq;
        NamespaceName: Null_Or_String;
        /** typename property */
        hbTypename?: string;
        constructor() {
            // : System.Xml.Linq -- System.Xml.Linq -- XName -- LocalName
            this.LocalName = "";
            // : System.Xml.Linq -- System.Xml.Linq -- XName -- Namespace
            this.Namespace =  new XNamespaceImpl();
            // : System.Xml.Linq -- System.Xml.Linq -- XName -- NamespaceName
            this.NamespaceName = "";
            this.hbTypename = "System.Xml.Linq.XName";
        }
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface XNamespace {
        NamespaceName: Null_Or_String;
    }
    export class XNamespaceImpl implements XNamespace {
        NamespaceName: Null_Or_String;
        /** typename property */
        hbTypename?: string;
        constructor() {
            // : System.Xml.Linq -- System.Xml.Linq -- XNamespace -- NamespaceName
            this.NamespaceName = "";
            this.hbTypename = "System.Xml.Linq.XNamespace";
        }
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface XDocument extends XContainer {
        Declaration: Null_Or_XDeclarationInSystemXmlLinq;
        DocumentType: Null_Or_XDocumentTypeInSystemXmlLinq;
        NodeType: System.Xml.XmlNodeType;
        Root: Null_Or_XElementInSystemXmlLinq;
    }
    export class XDocumentImpl extends XContainerImpl implements XDocument {
        Declaration: Null_Or_XDeclarationInSystemXmlLinq;
        DocumentType: Null_Or_XDocumentTypeInSystemXmlLinq;
        NodeType: System.Xml.XmlNodeType;
        Root: Null_Or_XElementInSystemXmlLinq;
        constructor() {
            super();
            // : System.Xml.Linq -- System.Xml.Linq -- XDocument -- Declaration
            this.Declaration =  new XDeclarationImpl();
            // : System.Xml.Linq -- System.Xml.Linq -- XDocument -- DocumentType
            this.DocumentType = null;
            // : System.Xml.Linq -- System.Xml.Linq -- XDocument -- NodeType
            this.NodeType = System.Xml.XmlNodeType.Document;
            // : System.Xml.Linq -- System.Xml.Linq -- XDocument -- Root
            this.Root = null;
            this.hbTypename = "System.Xml.Linq.XDocument";
            // override parent class default value
            this.Document = null;
            this.Parent = null;
        }
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface XDeclaration {
        Encoding: Null_Or_String;
        Standalone: Null_Or_String;
        Version: Null_Or_String;
    }
    export class XDeclarationImpl implements XDeclaration {
        Encoding: Null_Or_String;
        Standalone: Null_Or_String;
        Version: Null_Or_String;
        /** typename property */
        hbTypename?: string;
        constructor() {
            // : System.Xml.Linq -- System.Xml.Linq -- XDeclaration -- Encoding
            this.Encoding = "";
            // : System.Xml.Linq -- System.Xml.Linq -- XDeclaration -- Standalone
            this.Standalone = "";
            // : System.Xml.Linq -- System.Xml.Linq -- XDeclaration -- Version
            this.Version = "";
            this.hbTypename = "System.Xml.Linq.XDeclaration";
        }
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface XDocumentType extends XNode {
        InternalSubset: Null_Or_String;
        Name: Null_Or_String;
        NodeType: System.Xml.XmlNodeType;
        PublicId: Null_Or_String;
        SystemId: Null_Or_String;
    }
    export class XDocumentTypeImpl extends XNodeImpl implements XDocumentType {
        InternalSubset: Null_Or_String;
        Name: Null_Or_String;
        NodeType: System.Xml.XmlNodeType;
        PublicId: Null_Or_String;
        SystemId: Null_Or_String;
        constructor() {
            super();
            // : System.Xml.Linq -- System.Xml.Linq -- XDocumentType -- InternalSubset
            this.InternalSubset = "";
            // : System.Xml.Linq -- System.Xml.Linq -- XDocumentType -- Name
            this.Name = "";
            // : System.Xml.Linq -- System.Xml.Linq -- XDocumentType -- NodeType
            this.NodeType = System.Xml.XmlNodeType.None;
            // : System.Xml.Linq -- System.Xml.Linq -- XDocumentType -- PublicId
            this.PublicId = "";
            // : System.Xml.Linq -- System.Xml.Linq -- XDocumentType -- SystemId
            this.SystemId = "";
            this.hbTypename = "System.Xml.Linq.XDocumentType";
        }
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface XAttribute extends XObject {
        IsNamespaceDeclaration: boolean;
        Name: Null_Or_XNameInSystemXmlLinq;
        NextAttribute: Null_Or_XAttributeInSystemXmlLinq;
        NodeType: System.Xml.XmlNodeType;
        PreviousAttribute: Null_Or_XAttributeInSystemXmlLinq;
        Value: Null_Or_String;
    }
    export class XAttributeImpl extends XObjectImpl implements XAttribute {
        IsNamespaceDeclaration: boolean;
        Name: Null_Or_XNameInSystemXmlLinq;
        NextAttribute: Null_Or_XAttributeInSystemXmlLinq;
        NodeType: System.Xml.XmlNodeType;
        PreviousAttribute: Null_Or_XAttributeInSystemXmlLinq;
        Value: Null_Or_String;
        constructor() {
            super();
            // : System.Xml.Linq -- System.Xml.Linq -- XAttribute -- IsNamespaceDeclaration
            this.IsNamespaceDeclaration = false;
            // : System.Xml.Linq -- System.Xml.Linq -- XAttribute -- Name
            this.Name =  new XNameImpl();
            // : System.Xml.Linq -- System.Xml.Linq -- XAttribute -- NextAttribute
            this.NextAttribute = null;
            // : System.Xml.Linq -- System.Xml.Linq -- XAttribute -- NodeType
            this.NodeType = System.Xml.XmlNodeType.None;
            // : System.Xml.Linq -- System.Xml.Linq -- XAttribute -- PreviousAttribute
            this.PreviousAttribute = null;
            // : System.Xml.Linq -- System.Xml.Linq -- XAttribute -- Value
            this.Value = "";
            this.hbTypename = "System.Xml.Linq.XAttribute";
        }
    }
}
export namespace TsGenAspnetExample.Models {
    // tslint:disable-next-line:interface-name & class-name
    export interface Animal {
        AnimalType: EnumAnimalType;
        Name: Null_Or_String;
    }
    export abstract class AnimalImpl implements Animal,IName {
        AnimalType: EnumAnimalType;
        Name: Null_Or_String;
        /** typename property */
        hbTypename?: string;
        constructor() {
            // : TsGenAspnetExample -- TsGenAspnetExample.Models -- Animal -- AnimalType
            this.AnimalType = EnumAnimalType.Dog;
            // : TsGenAspnetExample -- TsGenAspnetExample.Models -- Animal -- Name
            this.Name = "";
            this.hbTypename = "TsGenAspnetExample.Models.Animal";
        }
    }
    export enum EnumAnimalType {
        Dog = 0,
        Cat = 1,
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface EntityWithType {
        XAttribute: Null_Or_XAttributeInSystemXmlLinq;
    }
    export class EntityWithTypeImpl implements EntityWithType {
        XAttribute: Null_Or_XAttributeInSystemXmlLinq;
        /** typename property */
        hbTypename?: string;
        constructor() {
            // : TsGenAspnetExample -- TsGenAspnetExample.Models -- EntityWithType -- XAttribute
            this.XAttribute =  new System.Xml.Linq.XAttributeImpl();
            this.hbTypename = "TsGenAspnetExample.Models.EntityWithType";
        }
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface Dog extends Animal {
    }
    export class DogImpl extends AnimalImpl implements Dog,IName {
        constructor() {
            super();
            this.hbTypename = "TsGenAspnetExample.Models.Dog";
        }
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface WechatOrder {
        CreateUser: Null_Or_INameInTsGenAspnetExampleModels;
        CurrentState: EnumOrderState;
        Id: number;
        OrderNumber: Null_Or_String;
        Result: Hongbo.Basic.Systems.CheckResult;
    }
    export class WechatOrderImpl implements WechatOrder {
        CreateUser: Null_Or_INameInTsGenAspnetExampleModels;
        CurrentState: EnumOrderState;
        Id: number;
        OrderNumber: Null_Or_String;
        Result: Hongbo.Basic.Systems.CheckResult;
        /** typename property */
        hbTypename?: string;
        constructor() {
            // : TsGenAspnetExample -- TsGenAspnetExample.Models -- WechatOrder -- CreateUser
            this.CreateUser =  {} as any;
            // : TsGenAspnetExample -- TsGenAspnetExample.Models -- WechatOrder -- CurrentState
            this.CurrentState = EnumOrderState.New;
            // : TsGenAspnetExample -- TsGenAspnetExample.Models -- WechatOrder -- Id
            this.Id = 0;
            // : TsGenAspnetExample -- TsGenAspnetExample.Models -- WechatOrder -- OrderNumber
            this.OrderNumber = "";
            // : TsGenAspnetExample -- TsGenAspnetExample.Models -- WechatOrder -- Result
            this.Result = {"HasError":false,"ErrorReason":null};
            this.hbTypename = "TsGenAspnetExample.Models.WechatOrder";
        }
    }
    export enum EnumOrderState {
        New = 0,
        WaitPay = 1,
        Payed = 2,
        Complete = 3,
        Failure = 4,
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface IName {
        Name: Null_Or_String;
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface Person {
        Name: Null_Or_String;
        Upper: Null_Or_ManagerInTsGenAspnetExampleModels;
    }
    export class PersonImpl implements Person {
        Name: Null_Or_String;
        Upper: Null_Or_ManagerInTsGenAspnetExampleModels;
        /** typename property */
        hbTypename?: string;
        constructor() {
            // : TsGenAspnetExample -- TsGenAspnetExample.Models -- Person -- Name
            this.Name = "";
            // : TsGenAspnetExample -- TsGenAspnetExample.Models -- Person -- Upper
            this.Upper = null;
            this.hbTypename = "TsGenAspnetExample.Models.Person";
        }
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface Manager extends Person {
        DownPersons: Array<Person>;
        Duty: Null_Or_String;
    }
    export class ManagerImpl extends PersonImpl implements Manager {
        DownPersons: Array<Person>;
        Duty: Null_Or_String;
        constructor() {
            super();
            // : TsGenAspnetExample -- TsGenAspnetExample.Models -- Manager -- DownPersons
            this.DownPersons = [];
            // : TsGenAspnetExample -- TsGenAspnetExample.Models -- Manager -- Duty
            this.Duty = "";
            this.hbTypename = "TsGenAspnetExample.Models.Manager";
            // override parent class default value
            this.Upper = null;
        }
    }
    // tslint:disable-next-line:interface-name & class-name
    export interface GenericWorkFlow<TEntity,TState> {
        Current: TState;
        EntityInstance: TEntity;
        Next: TState;
    }
    export class GenericWorkFlowImpl<TEntity,TState> implements GenericWorkFlow<TEntity,TState> {
        Current: TState;
        EntityInstance: TEntity;
        Next: TState;
        /** typename property */
        hbTypename?: string;
        constructor() {
            // : TsGenAspnetExample -- TsGenAspnetExample.Models -- GenericWorkFlow`2 -- Current
            this.Current = {} as any;
            // : TsGenAspnetExample -- TsGenAspnetExample.Models -- GenericWorkFlow`2 -- EntityInstance
            this.EntityInstance = {} as any;
            // : TsGenAspnetExample -- TsGenAspnetExample.Models -- GenericWorkFlow`2 -- Next
            this.Next = {} as any;
            this.hbTypename = "TsGenAspnetExample.Models.GenericWorkFlow`2";
        }
    }
}
