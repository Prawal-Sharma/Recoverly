'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Globe, MapPin, Users, ExternalLink, Search } from 'lucide-react'
import { meetings, searchMeetings, filterMeetings, getTodayMeetings, type Meeting } from '@/lib/meetings-data'

export function MeetingFinder() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProgram, setSelectedProgram] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedDay, setSelectedDay] = useState<string>('all')
  const [showTodayOnly, setShowTodayOnly] = useState(false)

  const programs = useMemo(() => {
    const uniquePrograms = Array.from(new Set(meetings.map(m => m.program)))
    return uniquePrograms.sort()
  }, [])

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Daily']

  const filteredMeetings = useMemo(() => {
    let results = meetings

    // Apply search if query exists
    if (searchQuery) {
      results = searchMeetings(searchQuery)
    }

    // Apply filters
    const filters: Parameters<typeof filterMeetings>[0] = {}
    
    if (selectedProgram !== 'all') {
      filters.program = selectedProgram
    }
    
    if (selectedType !== 'all') {
      filters.type = selectedType as 'online' | 'in-person' | 'hybrid'
    }
    
    if (selectedDay !== 'all') {
      filters.day = selectedDay
    }

    if (Object.keys(filters).length > 0) {
      results = filterMeetings(filters)
    }

    // Show today's meetings if toggled
    if (showTodayOnly) {
      results = getTodayMeetings()
    }

    return results
  }, [searchQuery, selectedProgram, selectedType, selectedDay, showTodayOnly])

  const handleJoinMeeting = (meeting: Meeting) => {
    if (meeting.url) {
      window.open(meeting.url, '_blank', 'noopener,noreferrer')
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedProgram('all')
    setSelectedType('all')
    setSelectedDay('all')
    setShowTodayOnly(false)
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Find Your Meeting</CardTitle>
          <CardDescription>
            Search and filter through {meetings.length} recovery meetings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search meetings, programs, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="grid gap-4 md:grid-cols-3">
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger>
                <SelectValue placeholder="Select program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                {programs.map(program => (
                  <SelectItem key={program} value={program}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Meeting type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="online">Online Only</SelectItem>
                <SelectItem value="in-person">In-Person Only</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger>
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Days</SelectItem>
                {days.map(day => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={showTodayOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowTodayOnly(!showTodayOnly)}
            >
              Today's Meetings
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Found {filteredMeetings.length} meeting{filteredMeetings.length !== 1 ? 's' : ''}
      </div>

      {/* Meeting Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredMeetings.map(meeting => (
          <Card key={meeting.id} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{meeting.name}</CardTitle>
                  <CardDescription>{meeting.program}</CardDescription>
                </div>
                {meeting.type === 'online' && (
                  <Badge variant="secondary" className="ml-2">
                    <Globe className="mr-1 h-3 w-3" />
                    Online
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Meeting Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {meeting.day}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  {meeting.time} {meeting.timezone}
                </div>
                {meeting.location && (
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {meeting.location}
                  </div>
                )}
              </div>

              {/* Format Badges */}
              <div className="flex flex-wrap gap-1">
                {meeting.format.map(format => (
                  <Badge key={format} variant="outline" className="text-xs">
                    {format}
                  </Badge>
                ))}
                {meeting.language && meeting.language !== 'English' && (
                  <Badge variant="outline" className="text-xs">
                    {meeting.language}
                  </Badge>
                )}
              </div>

              {/* Description */}
              {meeting.description && (
                <p className="text-sm text-muted-foreground">
                  {meeting.description}
                </p>
              )}

              {/* Join Button */}
              {meeting.url && (
                <Button
                  className="w-full"
                  size="sm"
                  onClick={() => handleJoinMeeting(meeting)}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Join Meeting
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredMeetings.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No meetings found matching your criteria. Try adjusting your filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}