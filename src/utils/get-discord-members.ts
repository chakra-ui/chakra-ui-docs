import { numberFormatter } from './number-formatter'

// https://discord.com/api/v9/guilds/660863154703695893/widget.json
// https://discord.com/api/v9/invites/hup7J23V?with_counts=true
export async function getDiscordMembers() {
  let count = 5_100 // Fallback if there's any error

  try {
    const data = await fetch(
      'https://discord.com/api/v9/invites/hup7J23V?with_counts=true',
    ).then((res) => res.json())

    count = data.approximate_member_count
  } catch (error) {
    console.log('Failed to get discord members count: ', error.toString())
  }

  return {
    count,
    prettyCount: numberFormatter.format(count),
  }
}
