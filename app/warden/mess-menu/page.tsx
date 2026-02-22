"use client"

import { useState } from "react"
import { UtensilsCrossed, ChevronLeft, ChevronRight, Star, Edit3, Save, Plus, Trash2 } from "lucide-react"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

interface Meal {
  type: string
  time: string
  items: string
  rating: number
  borderColor: string
}

const menuData: Record<string, Meal[]> = {
  Mon: [
    { type: "Breakfast", time: "7:30 - 9:00 AM", items: "Idli, Sambar, Chutney, Tea", rating: 4.2, borderColor: "border-t-amber-500" },
    { type: "Lunch", time: "12:30 - 2:00 PM", items: "Rice, Dal, Aloo Gobi, Roti, Curd", rating: 4.0, borderColor: "border-t-blue-500" },
    { type: "Snacks", time: "4:30 - 5:30 PM", items: "Samosa, Tea, Biscuits", rating: 3.8, borderColor: "border-t-purple-500" },
    { type: "Dinner", time: "7:30 - 9:00 PM", items: "Rice, Rajma, Roti, Salad", rating: 4.5, borderColor: "border-t-teal-500" },
  ],
  Tue: [
    { type: "Breakfast", time: "7:30 - 9:00 AM", items: "Poha, Jalebi, Milk, Tea", rating: 4.3, borderColor: "border-t-amber-500" },
    { type: "Lunch", time: "12:30 - 2:00 PM", items: "Rice, Sambar, Bhindi Fry, Roti, Buttermilk", rating: 3.9, borderColor: "border-t-blue-500" },
    { type: "Snacks", time: "4:30 - 5:30 PM", items: "Bread Pakora, Coffee", rating: 4.0, borderColor: "border-t-purple-500" },
    { type: "Dinner", time: "7:30 - 9:00 PM", items: "Jeera Rice, Chana Masala, Roti, Raita", rating: 4.1, borderColor: "border-t-teal-500" },
  ],
  Wed: [
    { type: "Breakfast", time: "7:30 - 9:00 AM", items: "Paratha, Curd, Pickle, Tea", rating: 4.5, borderColor: "border-t-amber-500" },
    { type: "Lunch", time: "12:30 - 2:00 PM", items: "Rice, Dal Tadka, Paneer Butter Masala, Roti", rating: 4.4, borderColor: "border-t-blue-500" },
    { type: "Snacks", time: "4:30 - 5:30 PM", items: "Vada Pav, Tea", rating: 4.2, borderColor: "border-t-purple-500" },
    { type: "Dinner", time: "7:30 - 9:00 PM", items: "Pulao, Raita, Mixed Veg, Roti", rating: 4.0, borderColor: "border-t-teal-500" },
  ],
  Thu: [
    { type: "Breakfast", time: "7:30 - 9:00 AM", items: "Upma, Chutney, Banana, Tea", rating: 3.8, borderColor: "border-t-amber-500" },
    { type: "Lunch", time: "12:30 - 2:00 PM", items: "Rice, Kadhi Pakora, Aloo Matar, Roti", rating: 4.1, borderColor: "border-t-blue-500" },
    { type: "Snacks", time: "4:30 - 5:30 PM", items: "Maggi, Juice", rating: 4.6, borderColor: "border-t-purple-500" },
    { type: "Dinner", time: "7:30 - 9:00 PM", items: "Rice, Dal Makhani, Roti, Salad", rating: 4.3, borderColor: "border-t-teal-500" },
  ],
  Fri: [
    { type: "Breakfast", time: "7:30 - 9:00 AM", items: "Chole Bhature, Lassi", rating: 4.8, borderColor: "border-t-amber-500" },
    { type: "Lunch", time: "12:30 - 2:00 PM", items: "Biryani, Raita, Salad, Papad", rating: 4.7, borderColor: "border-t-blue-500" },
    { type: "Snacks", time: "4:30 - 5:30 PM", items: "Cake, Tea", rating: 4.3, borderColor: "border-t-purple-500" },
    { type: "Dinner", time: "7:30 - 9:00 PM", items: "Rice, Malai Kofta, Naan, Gulab Jamun", rating: 4.6, borderColor: "border-t-teal-500" },
  ],
  Sat: [
    { type: "Breakfast", time: "7:30 - 9:00 AM", items: "Dosa, Sambar, Chutney, Coffee", rating: 4.4, borderColor: "border-t-amber-500" },
    { type: "Lunch", time: "12:30 - 2:00 PM", items: "Rice, Chole, Puri, Pickle", rating: 4.2, borderColor: "border-t-blue-500" },
    { type: "Snacks", time: "4:30 - 5:30 PM", items: "Popcorn, Cold Drink", rating: 3.9, borderColor: "border-t-purple-500" },
    { type: "Dinner", time: "7:30 - 9:00 PM", items: "Fried Rice, Manchurian, Soup", rating: 4.4, borderColor: "border-t-teal-500" },
  ],
  Sun: [
    { type: "Breakfast", time: "8:00 - 10:00 AM", items: "Aloo Paratha, Curd, Pickle, Tea, Juice", rating: 4.7, borderColor: "border-t-amber-500" },
    { type: "Lunch", time: "12:30 - 2:00 PM", items: "Special Thali - Rice, Dal, Paneer, Roti, Sweet", rating: 4.8, borderColor: "border-t-blue-500" },
    { type: "Snacks", time: "4:30 - 5:30 PM", items: "Spring Roll, Milkshake", rating: 4.5, borderColor: "border-t-purple-500" },
    { type: "Dinner", time: "7:30 - 9:00 PM", items: "Butter Naan, Shahi Paneer, Rice, Ice Cream", rating: 4.9, borderColor: "border-t-teal-500" },
  ],
}

export default function WardenMessMenu() {
  const [selectedDay, setSelectedDay] = useState("Mon")
  const [editMode, setEditMode] = useState(false)

  const meals = menuData[selectedDay] || []

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mess Menu Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">View and update daily mess menu with student feedback</p>
        </div>
        <button onClick={() => setEditMode(!editMode)} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${editMode ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
          {editMode ? <><Save className="h-4 w-4" />Save Changes</> : <><Edit3 className="h-4 w-4" />Edit Menu</>}
        </button>
      </div>

      {/* Day Selector */}
      <div className="mt-6 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"><ChevronLeft className="h-5 w-5" /></button>
          <div className="flex gap-2">
            {days.map((d) => (
              <button key={d} onClick={() => setSelectedDay(d)} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${selectedDay === d ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>{d}</button>
            ))}
          </div>
          <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>

      {/* Menu Title */}
      <h2 className="mt-6 text-center text-xl font-bold text-foreground">{dayNames[days.indexOf(selectedDay)]}{"'s Menu"}</h2>

      {/* Meal Cards */}
      <div className="mt-4 space-y-4">
        {meals.map((meal) => (
          <div key={meal.type} className={`rounded-xl border border-border bg-card overflow-hidden border-t-4 ${meal.borderColor}`}>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UtensilsCrossed className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-foreground">{meal.type}</h3>
                      <span className="text-sm text-muted-foreground">{meal.time}</span>
                    </div>
                    {editMode ? (
                      <input defaultValue={meal.items} className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                    ) : (
                      <p className="mt-1 text-sm text-muted-foreground">{meal.items}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold text-amber-700">{meal.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editMode && (
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-card p-4 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors">
          <Plus className="h-4 w-4" />
          Add Meal
        </button>
      )}

      {/* Feedback Summary */}
      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold text-foreground">Student Feedback Summary</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-border p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">4.3</p>
            <p className="text-xs text-muted-foreground">Avg Rating This Week</p>
          </div>
          <div className="rounded-lg border border-border p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">86%</p>
            <p className="text-xs text-muted-foreground">Satisfaction Rate</p>
          </div>
          <div className="rounded-lg border border-border p-4 text-center">
            <p className="text-2xl font-bold text-primary">156</p>
            <p className="text-xs text-muted-foreground">Feedback Received</p>
          </div>
          <div className="rounded-lg border border-border p-4 text-center">
            <p className="text-2xl font-bold text-red-600">12</p>
            <p className="text-xs text-muted-foreground">Negative Reviews</p>
          </div>
        </div>
      </div>
    </div>
  )
}
