"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star, UtensilsCrossed } from "lucide-react"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

type MealData = {
  name: string
  time: string
  items: string
  rating: number
  borderColor: string
}

const menuData: Record<string, MealData[]> = {
  Mon: [
    {
      name: "Breakfast",
      time: "7:30 - 9:00 AM",
      items: "Idli, Sambar, Chutney, Tea",
      rating: 4.2,
      borderColor: "border-t-amber-500",
    },
    {
      name: "Lunch",
      time: "12:30 - 2:00 PM",
      items: "Rice, Dal, Aloo Gobi, Roti, Curd",
      rating: 4.0,
      borderColor: "border-t-blue-600",
    },
    {
      name: "Dinner",
      time: "7:30 - 9:00 PM",
      items: "Rice, Rajma, Roti, Salad",
      rating: 4.5,
      borderColor: "border-t-teal-500",
    },
  ],
  Tue: [
    {
      name: "Breakfast",
      time: "7:30 - 9:00 AM",
      items: "Poha, Jalebi, Milk, Tea",
      rating: 4.3,
      borderColor: "border-t-amber-500",
    },
    {
      name: "Lunch",
      time: "12:30 - 2:00 PM",
      items: "Rice, Sambar, Cabbage Poriyal, Roti, Buttermilk",
      rating: 3.9,
      borderColor: "border-t-blue-600",
    },
    {
      name: "Dinner",
      time: "7:30 - 9:00 PM",
      items: "Chapati, Paneer Butter Masala, Rice, Salad",
      rating: 4.6,
      borderColor: "border-t-teal-500",
    },
  ],
  Wed: [
    {
      name: "Breakfast",
      time: "7:30 - 9:00 AM",
      items: "Paratha, Curd, Pickle, Tea",
      rating: 4.1,
      borderColor: "border-t-amber-500",
    },
    {
      name: "Lunch",
      time: "12:30 - 2:00 PM",
      items: "Rice, Chana Dal, Bhindi Fry, Roti, Raita",
      rating: 4.0,
      borderColor: "border-t-blue-600",
    },
    {
      name: "Dinner",
      time: "7:30 - 9:00 PM",
      items: "Rice, Kadhi, Roti, Papad",
      rating: 3.8,
      borderColor: "border-t-teal-500",
    },
  ],
  Thu: [
    {
      name: "Breakfast",
      time: "7:30 - 9:00 AM",
      items: "Upma, Vada, Chutney, Coffee",
      rating: 4.0,
      borderColor: "border-t-amber-500",
    },
    {
      name: "Lunch",
      time: "12:30 - 2:00 PM",
      items: "Biryani, Raita, Boiled Egg, Salad",
      rating: 4.7,
      borderColor: "border-t-blue-600",
    },
    {
      name: "Dinner",
      time: "7:30 - 9:00 PM",
      items: "Roti, Mix Veg, Rice, Dal",
      rating: 3.9,
      borderColor: "border-t-teal-500",
    },
  ],
  Fri: [
    {
      name: "Breakfast",
      time: "7:30 - 9:00 AM",
      items: "Dosa, Sambar, Chutney, Tea",
      rating: 4.4,
      borderColor: "border-t-amber-500",
    },
    {
      name: "Lunch",
      time: "12:30 - 2:00 PM",
      items: "Rice, Dal Fry, Palak Paneer, Roti, Curd",
      rating: 4.2,
      borderColor: "border-t-blue-600",
    },
    {
      name: "Dinner",
      time: "7:30 - 9:00 PM",
      items: "Chole Bhature, Rice, Salad, Sweet",
      rating: 4.8,
      borderColor: "border-t-teal-500",
    },
  ],
  Sat: [
    {
      name: "Breakfast",
      time: "7:30 - 9:00 AM",
      items: "Bread, Butter, Jam, Omelette, Tea",
      rating: 3.8,
      borderColor: "border-t-amber-500",
    },
    {
      name: "Lunch",
      time: "12:30 - 2:00 PM",
      items: "Rice, Rajma, Roti, Pickle, Curd",
      rating: 4.1,
      borderColor: "border-t-blue-600",
    },
    {
      name: "Dinner",
      time: "7:30 - 9:00 PM",
      items: "Pav Bhaji, Pulao, Raita",
      rating: 4.3,
      borderColor: "border-t-teal-500",
    },
  ],
  Sun: [
    {
      name: "Breakfast",
      time: "7:30 - 9:00 AM",
      items: "Chole Bhature, Lassi, Tea",
      rating: 4.6,
      borderColor: "border-t-amber-500",
    },
    {
      name: "Lunch",
      time: "12:30 - 2:00 PM",
      items: "Chicken Biryani / Veg Biryani, Raita, Salad, Sweet",
      rating: 4.9,
      borderColor: "border-t-blue-600",
    },
    {
      name: "Dinner",
      time: "7:30 - 9:00 PM",
      items: "Roti, Egg Curry / Paneer, Rice, Dal",
      rating: 4.1,
      borderColor: "border-t-teal-500",
    },
  ],
}

export default function MessMenuPage() {
  const [selectedDay, setSelectedDay] = useState(0)

  const currentDay = days[selectedDay]
  const meals = menuData[currentDay]

  function prevDay() {
    setSelectedDay((prev) => (prev === 0 ? 6 : prev - 1))
  }

  function nextDay() {
    setSelectedDay((prev) => (prev === 6 ? 0 : prev + 1))
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mess Menu</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View daily menu and provide feedback
        </p>
      </div>

      {/* Day Selector */}
      <div className="mt-6 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={prevDay}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {days.map((day, i) => (
              <button
                key={day}
                onClick={() => setSelectedDay(i)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  i === selectedDay
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <button
            onClick={nextDay}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Menu Cards */}
      <div className="mt-6">
        <h2 className="text-center text-lg font-bold text-foreground">
          {dayNames[selectedDay]}{"'s Menu"}
        </h2>

        <div className="mt-4 space-y-4">
          {meals.map((meal) => (
            <div
              key={meal.name}
              className={`rounded-xl border border-border bg-card p-5 border-t-4 ${meal.borderColor}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <UtensilsCrossed className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-foreground">
                        {meal.name}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {"· "}
                        {meal.time}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {meal.items}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="text-sm font-semibold text-amber-700">
                    {meal.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
