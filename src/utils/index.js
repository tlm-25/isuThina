export const statusLevels = {
    low: {
        color: "#047857",
        background: "#d1fae5",
        description: 'Caffeine levels are mild, resulting in a light boost in alertness with minimal side effects.',
        maxLevel: 100
    },
    moderate: {
        color: "#b45309",
        background: "#fef3c7",
        description: 'A moderate amount of caffeine leads to noticeable stimulation, increased focus, and potential restlessness.',
        maxLevel: 200
    },
    high: {
        color: "#e11d48",
        background: "#ffe4e6",
        description: 'Elevated caffeine levels can cause jitteriness, rapid heartbeat, and trouble concentrating, signaling an excessive intake.',
        maxLevel: 9999
    },
}


export const wordDictionary = [
  { "ChiShona": "Taura", "English": "Speak", "Language": "ChiShona" },
  { "ChiShona": "Tamba", "English": "Play/Dance", "Language": "ChiShona" },
  { "ChiShona": "Ita", "English": "Do", "Language": "ChiShona" },
  { "ChiShona": "Budirira", "English": "Succeed", "Language": "ChiShona" },
  { "ChiShona": "Tanga", "English": "Start/Begin", "Language": "ChiShona" },
  { "ChiShona": "Imbwa", "English": "Dog", "Language": "ChiShona" },
  { "ChiShona": "Famba", "English": "Walk/Travel", "Language": "ChiShona" },
  { "ChiShona": "Buda", "English": "Leave/Exit/Come out", "Language": "ChiShona" },
  { "ChiShona": "Pedza", "English": "Finish (Finish doing something)", "Language": "ChiShona" },
  { "ChiShona": "Enda", "English": "Go", "Language": "ChiShona" },
  { "ChiShona": "Simbisa", "English": "Strengthen", "Language": "ChiShona" },


  { "IsiNdebele": "Khuluma", "English": "Speak", "Language": "IsiNdebele" },
  { "IsiNdebele": "Funda", "English": "Learn/Read", "Language": "IsiNdebele" },
  { "IsiNdebele": "Qala", "English": "Start", "Language": "IsiNdebele" },
  { "IsiNdebele": "Qinisa", "English": "Strengthen", "Language": "IsiNdebele" },
  { "IsiNdebele": "Hamba", "English": "Walk/Travel/Leave", "Language": "IsiNdebele" },
  { "IsiNdebele": "Enza", "English": "Do/Make", "Language": "IsiNdebele" },
  { "IsiNdebele": "Cabanga", "English": "Think", "Language": "IsiNdebele" },
  { "IsiNdebele": "Faka", "English": "Put", "Language": "IsiNdebele" },
  { "IsiNdebele": "Giqa", "English": "Roll along", "Language": "IsiNdebele" },
  { "IsiNdebele": "Gwaza", "English": "Stab", "Language": "IsiNdebele" },
  { "IsiNdebele": "Inja", "English": "Dog", "Language": "IsiNdebele" },

  { "IsiXhosa": "Theta", "English": "Speak", "Language": "IsiXhosa" }
  
]


export const languages =["ChiShona","IsiNdebele","IsiXhosa"]

const halfLifeHours = 5


export function calculateCurrentCaffeineLevel(historyData) {
    const currentTime = Date.now()
    const halfLife = halfLifeHours * 60 * 60 * 1000 // 5 hours in milliseconds
    const maxAge = 48 * 60 * 60 * 1000 // 48 hours in milliseconds

    let totalCaffeine = 0

    for (const [timestamp, entry] of Object.entries(historyData)) {
        const timeElapsed = currentTime - parseInt(timestamp)

        // Ignore entries older than 48 hours
        if (timeElapsed <= maxAge) {
            const caffeineInitial = getCaffeineAmount(entry.name)
            // Calculate the remaining caffeine using the half-life formula
            const remainingCaffeine = caffeineInitial * Math.pow(0.5, timeElapsed / halfLife)
            totalCaffeine += remainingCaffeine
        }
    }

    return totalCaffeine.toFixed(2)
}

// Helper function to get caffeine amount based on the coffee name
export function getCaffeineAmount(coffeeName) {
    const coffee = ShonaWords.find(c => c.name === coffeeName)
    return coffee ? coffee.caffeine : 0
}

export function getTopThreeCoffees(historyData) {
    const coffeeCount = {}

    // Count occurrences of each coffee type
    for (const entry of Object.values(historyData)) {
        const coffeeName = entry.name
        if (coffeeCount[coffeeName]) {
            coffeeCount[coffeeName]++
        } else {
            coffeeCount[coffeeName] = 1
        }
    }

    // Convert coffeeCount object to an array of [coffeeName, count] and sort by count
    const sortedCoffees = Object.entries(coffeeCount).sort((a, b) => b[1] - a[1])

    // Calculate total coffees consumed
    const totalCoffees = Object.values(coffeeCount).reduce((sum, count) => sum + count, 0)

    // Get the top 3 most popular coffees
    const topThree = sortedCoffees.slice(0, 3).map(([coffeeName, count]) => {
        const percentage = ((count / totalCoffees) * 100).toFixed(2)
        return {
            coffeeName: coffeeName,
            count: count,
            percentage: percentage + '%'
        }
    })

    return topThree
}

export function timeSinceConsumption(utcMilliseconds) {
    const now = Date.now()
    const diffInMilliseconds = now - utcMilliseconds

    // Convert to seconds, minutes, hours, days, and months
    const seconds = Math.floor(diffInMilliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)

    // Get the remainder for each unit
    const remainingDays = days % 30
    const remainingHours = hours % 24
    const remainingMinutes = minutes % 60
    const remainingSeconds = seconds % 60

    // Construct the string
    let result = ''
    if (months > 0) result += `${months}M `
    if (remainingDays > 0) result += `${remainingDays}D `
    if (remainingHours > 0) result += `${remainingHours}H `
    if (remainingMinutes > 0) result += `${remainingMinutes}M `
    if (remainingSeconds > 0 || result === '') result += `${remainingSeconds}S` // Show seconds even if they're 0 if nothing else exists

    return result.trim() // Remove any trailing space
}

// This function was added during recording
export function calculateCoffeeStats(coffeeConsumptionHistory) {
    const dailyStats = {}
    let totalCoffees = 0
    let totalCost = 0
    let totalCaffeine = 0
    let totalDaysWithCoffee = 0

    for (const [timestamp, coffee] of Object.entries(coffeeConsumptionHistory)) {
        const date = new Date(parseInt(timestamp)).toISOString().split('T')[0] // Extract date in YYYY-MM-DD format
        const caffeine = getCaffeineAmount(coffee.name)
        const cost = parseFloat(coffee.cost)

        // Initialize or update the daily stats
        if (!dailyStats[date]) {
            dailyStats[date] = { caffeine: 0, cost: 0, count: 0 }
        }

        dailyStats[date].caffeine += caffeine
        dailyStats[date].cost += cost
        dailyStats[date].count += 1

        // Update totals
        totalCoffees += 1
        totalCost += cost
    }

    const days = Object.keys(dailyStats).length;
    const dailyCaffeine = {};
    for (const [date, stats] of Object.entries(dailyStats)) {
        if (stats.caffeine > 0) {
            totalCaffeine += stats.caffeine
            totalDaysWithCoffee += 1; // Count days when caffeine was consumed
        }
    }

    // Calculate average daily caffeine and average daily cost
    const averageDailyCaffeine = totalDaysWithCoffee > 0 ? (totalCaffeine / totalDaysWithCoffee).toFixed(2) : 0
    const averageDailyCost = totalDaysWithCoffee > 0 ? (totalCost / totalDaysWithCoffee).toFixed(2) : 0
    console.log(totalCost, typeof totalCost)
    return {
        daily_caffeine: averageDailyCaffeine,
        daily_cost: averageDailyCost,
        average_coffees: (totalCoffees / days).toFixed(2),
        total_cost: totalCost.toFixed(2),
    };
}