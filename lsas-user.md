# FOBOS System Documentation

## Scene Categories and Implementation Details

### 1. Conference Scenarios (SYTUACJE SPOŁECZNE NA KONFERENCJI)

#### Scene Structure
Each scenario consists of three 5-minute progressions:

**Scenario 1: Pre-presentation Waiting**
- Base Version (ID: 123405) - Minimal distractions
- Medium Version (ID: 124222) - Audience expressing expectations
- Extreme Version (ID: 125915) - Chair movements, loud conversations

**Scenario 2: Active Presentation**
- Base Version (ID: 130924) - Attentive listening
- Medium Version (ID: 132043) - Requests for louder speaking, audience movement
- Extreme Version (ID: 132848) - Background conversations, phone usage, disruptions

**Scenario 3: Q&A Interaction**
- Base Version (ID: 135736) - Post-presentation feedback
- Medium Version (ID: 142402) - Mixed audience engagement, brief questions
- Extreme Version (ID: 134414) - Whispers during presentation, animated feedback

#### Technical Requirements
```typescript
interface ConferenceSceneConfig {
  roomType: 'LECTURE_HALL' | 'CONFERENCE_ROOM' | 'SEMINAR_ROOM';
  audienceSize: number;
  lightingLevel: number;  // 0-1, default 0.8
  ambientNoise: number;  // 0-1, default 0.3
  checkpoints: Checkpoint[];
}

interface Checkpoint {
  timestamp: number;
  type: 'DISTRACTOR' | 'SOCIAL_CUE' | 'TECHNICAL_ISSUE';
  intensity: number;  // 1-10
}
```

### 2. Public Waiting Room Scenarios (SYTUACJA SPOŁECZNA W MIEJSCU PUBLICZNYM)

#### Scene Structure
**Scenario 1: Corner Observer**
- Base Version (ID: 130448) - Minimal phone reactions
- Medium Version (ID: 131256) - Limited attention from nearby person
- Extreme Version (ID: 132613) - Multiple phone rings, people moving

**Scenario 2: Between Others Setting**
- Base Version (ID: 135133) - Mild disapproval from neighbor
- Medium Version (ID: 134530) - Direct observation from neighbor
- Extreme Version (ID: 135800) - Visible disapproval, movement

**Scenario 3: Stressful Phone Situation**
- Base Version (ID: 141443) - Neutral reaction to "police" mention
- Medium Version (ID: 142543) - Increased restlessness
- Extreme Version (ID: 143614) - Strong reactions, tense atmosphere

#### Implementation Structure
```typescript
interface WaitingRoomConfig {
  occupancy: number;
  phoneCallTriggers: PhoneEvent[];
  socialInteractions: SocialEvent[];
  environmentalFactors: EnvironmentalFactor[];
}

interface PhoneEvent {
  timing: number;      // Seconds into scene
  duration: number;    // Call duration
  urgency: number;     // 1-10
  complexity: number;  // 1-10
}
```

[Additional scene configurations remain unchanged]

## SUD (Subjective Units of Distress) Implementation

### SUD Configuration
```typescript
interface SUDConfig {
  scale: {
    min: 0;
    max: 100;
    checkpoints: number[];  // Key points for measurement
  };
  measurementTiming: {
    preExposure: boolean;
    postExposure: boolean;
    intervalChecks: boolean;
  };
  display: {
    showScale: boolean;
    showDescription: boolean;
    allowSkip: boolean;
  };
}
```

### SUD Integration
- Measurements taken after each scene completion
- Scale ranges from 0 to 100
- WAT algorithm uses SUD scores to determine:
  - Scene progression
  - Level adjustment
  - Exposure repetition needs

### WAT Decision Matrix
```typescript
interface WATDecisionConfig {
  sudThresholds: {
    advance: number;     // Threshold to progress
    repeat: number;      // Threshold to repeat
    retreat: number;     // Threshold to move back
  };
  exposureTime: {
    minimum: number;     // Seconds
    optimal: number;     // Seconds
    maximum: number;     // Seconds
  };
  progressionRules: {
    requireConsecutiveSuccess: boolean;
    allowSkipLevels: boolean;
    maxAttempts: number;
  };
}
```
## Scene description
# FOBOS Virtual Reality Therapy Scenes: What to Expect

## Conference Presentation Scenarios

These scenarios help you become more comfortable with public speaking and presenting in front of an audience. Each scenario progresses through three stages: waiting to present, giving your presentation, and handling questions afterward.

### Scenario 1: Waiting to Present
In this scene, you'll experience the moments before your presentation begins. You'll be at the front of the room, waiting for your turn to speak.

**Gentle Version (123405)**
- Calm, quiet atmosphere
- Minimal distractions
- Audience quietly waiting
- Good for your first experience

**Moderate Version (124222)**
- Some audience members expressing anticipation
- Occasional murmurs about presentation expectations
- Slightly more active environment
- Good for building confidence

**Challenging Version (125915)**
- More active audience movement
- Some chair shuffling sounds
- Background conversations
- Helps you stay focused despite distractions

### Scenario 2: Giving Your Presentation
This scene puts you in the position of actively presenting to the audience.

**Gentle Version (130924)**
- Attentive, respectful audience
- Minimal disruptions
- Supportive environment
- Perfect for practicing your delivery

**Moderate Version (132043)**
- Someone requests you to speak louder
- One person leaves the room
- Some conversations in the front row
- Helps you handle minor interruptions

**Challenging Version (132848)**
- Background conversations and occasional laughter
- Front row audience member checking phone
- People moving around
- Builds resilience to various distractions

### Scenario 3: Question and Answer Session
Practice handling questions and feedback after your presentation.

**Gentle Version (135736)**
- Starts with supportive applause
- Straightforward, friendly questions
- Attentive audience during answers
- Great for building Q&A confidence

**Moderate Version (142402)**
- Mixed audience engagement
- Some movement during questions
- Brief, clear questions from individuals
- Good practice for real Q&A sessions

**Challenging Version (134414)**
- Background whispers during answers
- More animated audience reactions
- Energetic atmosphere
- Helps maintain composure during lively discussions

## Public Waiting Room Scenarios

These scenarios help you manage anxiety around phone calls in public spaces and handling others' reactions.

### Scenario 1: Corner Seat Position
You'll be seated in a corner of the waiting room, observing and handling phone interactions.

**Gentle Version (130448)**
- Quiet waiting room
- Minimal reactions to phone ringing
- Comfortable corner position
- Good starting point for public phone anxiety

**Moderate Version (131256)**
- Slightly busier environment
- One person nearby notices phone
- Natural waiting room atmosphere
- Builds comfort with being noticed

**Challenging Version (132613)**
- Multiple phone rings
- People walking around
- More dynamic environment
- Helps manage repeated interruptions

### Scenario 2: Middle Seat Position
Experience handling phone calls while seated between other people.

**Gentle Version (135133)**
- Mild reaction from one neighbor
- Generally calm atmosphere
- Clear personal space
- Practice managing mild social pressure

**Moderate Version (134530)**
- More direct observation from neighbors
- Increased awareness of surroundings
- Natural waiting room movement
- Builds confidence in closer proximity to others

**Challenging Version (135800)**
- Visible reactions from others
- People showing disapproval
- Movement around you
- Develops resilience to social pressure

### Scenario 3: Important Phone Call
Practice handling a significant phone conversation in public.

**Gentle Version (141443)**
- Routine conversation mentioning police
- Minimal audience reaction
- Comfortable pacing
- Good for practicing serious conversations

**Moderate Version (142543)**
- Some sounds of disapproval
- Increased waiting room activity
- More challenging atmosphere
- Builds focus during important calls

**Challenging Version (143614)**
- Strong reactions from others
- Tense atmosphere
- Multiple distractions
- Develops ability to handle pressure

## Tips for Your VR Therapy Sessions

1. **Start Gradually**
   - Begin with gentle versions of each scenario
   - Move to more challenging versions at your own pace
   - It's okay to repeat scenes until you feel comfortable

2. **Using the SUD Scale**
   - You'll be asked to rate your anxiety from 0-100
   - Be honest about your feelings
   - This helps the system adjust to your needs

3. **During the Experience**
   - Take deep breaths if you feel anxious
   - Remember you can pause if needed
   - Focus on small improvements each time

4. **Progress Tracking**
   - Notice how your comfort levels change
   - Celebrate small victories
   - Use feedback to guide your practice

Remember: Every person progresses at their own pace. What matters is your personal journey and comfort level. The system will adapt to your needs and help you build confidence gradually.

## Development Guidelines

1. **Scene requirements**
   - we need to measure start and stop time of scene (or user interaction like pause), to trigger SUD measurement and pass that score to WAT. 
   - Before scene is played we should mention about therapist presence and that he will be monitoring user's experience and that he will be able to help if needed.
   

2. **MVP requirements**
   - Currently we don't need to play a video, simply we can just count time of scene and pass it to WAT.
   - I want also to see which scene is currently playing.
   - I want a separate page for all scenes and their scores and if patient is eligible to play those scenes based on WAT recommendations. If not it should be locked. Only admin should be able to unlock it by typing 'admin' to open modal and then typing 'unlock' to unlock it.
