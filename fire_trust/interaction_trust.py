# Define a function to calculate Interaction Trust (IT)
def calculate_interaction_trust(ratings, current_agent, target_agent, term):
    # Filter ratings for the current agent and target agent regarding the specific term
    relevant_ratings = [rating for rating in ratings if
                        rating['agents'] == (current_agent, target_agent) and rating['term'] == term]

    m = 0.5

    # Calculate the weighted mean of the rating values[^2^][2]
    weighted_sum = sum(rating['weight'] * rating['value'] for rating in relevant_ratings)
    total_weight = sum(rating['weight'] for rating in relevant_ratings)

    # Calculate IT value
    interaction_trust = weighted_sum / total_weight if total_weight else 0

    # Calculate reliability based on the number of ratings and their deviation[^3^][3]
    num_ratings = len(relevant_ratings)
    reliability_n = min(num_ratings / m, 1)  # m is a predefined threshold
    deviation = sum(abs(rating['value'] - interaction_trust) for rating in relevant_ratings)
    reliability_d = 1 - deviation / (2 * num_ratings) if num_ratings else 0

    # Final reliability measure for IT
    reliability_it = reliability_n * reliability_d

    return interaction_trust, reliability_it


# Sample ratings data
ratings = [
    {'agents': ('AgentA', 'AgentB'), 'term': 'communication', 'weight': 0.8, 'value': 0.7},
    {'agents': ('AgentA', 'AgentC'), 'term': 'communication', 'weight': 0.6, 'value': 0.6},
    {'agents': ('AgentB', 'AgentC'), 'term': 'communication', 'weight': 0.7, 'value': 0.5},
    {'agents': ('AgentA', 'AgentB'), 'term': 'trust', 'weight': 0.9, 'value': 0.8},
    {'agents': ('AgentA', 'AgentC'), 'term': 'trust', 'weight': 0.5, 'value': 0.7},
]

# Agents involved
current_agent = 'AgentA'
target_agent = 'AgentB'

# Term for which interaction trust is being calculated
term = 'communication'

# Calculate interaction trust
interaction_trust, reliability_it = calculate_interaction_trust(ratings, current_agent, target_agent, term)

# Print the result
print("Interaction Trust:", interaction_trust)
print("Reliability:", reliability_it)
