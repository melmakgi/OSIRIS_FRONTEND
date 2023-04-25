import type { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

/**
* redirect: noredirect        Маршрут не кликабелен в навигационных хлебных крошках, когда установлено значение noredirect
* name:'router-name'          Задайте имя маршрута, обязательно заполните его или используйте <keep-alive>
*                             Проблемы могут возникнуть в следующих случаях
* meta : {
    hidden: true              При установке значения true маршрут больше не будет отображаться в боковой панели как 404，
                              loginи др. страницы (по умолчанию false)

    alwaysShow: true          Когда вы прокладываете маршрут в children Если заявлено более одного маршрута，
                              Автоматически становится вложенным шаблоном，
                              Если есть только один, этот дочерний маршрут будет отображаться в боковой панели как корневой маршрут，
                              Если вы хотите проложить маршрут children Количество деклараций, все из которых показывают корневой маршрут，
                              Вы можете установить alwaysShow: true，Таким образом, он будет игнорировать ранее определенные правила，
                              一Прямое отображение корневого маршрута (по умолчанию) false)

    title: 'title'            Задайте имя маршрута, которое будет отображаться на боковой панели и в хлебных крошках

    icon: 'svg-name'          Установите значок для этого маршрута

    noCache: true             Если установлено значение true, он не будет кэшироваться <keep-alive> (по умолчанию false).

    breadcrumb: false         Если установлено значение false, он не будет отображаться в хлебных крошках (по умолчанию true).

    affix: true              Если установлено значение true, он всегда будет фиксироваться в элементе тега (по умолчанию false)

    noTagsView: true          Если установлено значение true, он не будет отображаться в теге (по умолчанию false).

    activeMenu: '/dashboard'  Показать выделенные пути маршрутизации

    followAuth: '/dashboard'  По какому маршруту следовать для фильтрации разрешений

    canTo: true               Установите значение true, чтобы разрешить маршрутизацию, даже если hidden равен true (по умолчанию false).
  }
**/
declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    hidden?: boolean
    alwaysShow?: boolean
    title?: string
    icon?: string
    noCache?: boolean
    breadcrumb?: boolean
    affix?: boolean
    activeMenu?: string
    noTagsView?: boolean
    followAuth?: string
    canTo?: boolean
  }
}

type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

declare global {
  declare interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string
    meta: RouteMeta
    component?: Component | string
    children?: AppRouteRecordRaw[]
    props?: Recordable
    fullPath?: string
  }

  declare interface AppCustomRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string
    meta: RouteMeta
    component: string
    path: string
    redirect: string
    children?: AppCustomRouteRecordRaw[]
  }
}
