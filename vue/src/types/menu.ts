export interface MenuItem {
  id: string
  title: string
}

export interface MenuCategory {
  title: string
  children: MenuItem[]
} 