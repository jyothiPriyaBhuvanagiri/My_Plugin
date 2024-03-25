def calculate_witness_reputation(witness_ratings):
    """
    Calculate the witness reputation based on witness ratings.

    Args:
        witness_ratings (list of dict): List of witness ratings, where each dictionary contains:
            - 'witness_id': ID of the witness
            - 'trust_score': Trust score assigned by the witness (e.g., between -1 and 1)

    Returns:
        float: Witness reputation score
    """
    total_trust_score = 0
    total_weight = 0

    for rating in witness_ratings:
        trust_score = rating.get('trust_score', 0)
        weight = rating.get('weight', 1)  # Default weight is 1 if not specified
        total_trust_score += trust_score * weight
        total_weight += weight

    # Calculate the weighted average of trust scores
    if total_weight > 0:
        witness_reputation = total_trust_score / total_weight
    else:
        witness_reputation = 0

    return witness_reputation

# Example usage of calculate_witness_reputation function

# Define witness ratings
witness_ratings = [
    {'witness_id': 'w1', 'trust_score': 0.8, 'weight': 0.5},
    {'witness_id': 'w2', 'trust_score': 0.6, 'weight': 1.0},
    {'witness_id': 'w3', 'trust_score': -0.2}  # No weight specified, defaults to 1
]

# Calculate witness reputation
witness_reputation = calculate_witness_reputation(witness_ratings)

# Print the witness reputation
print("Witness Reputation Score:", witness_reputation)