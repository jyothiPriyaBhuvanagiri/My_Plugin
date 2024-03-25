from interaction_trust import calculate_interaction_trust
from role_based_trust import evaluate_trust


def final_trust_outcome(agent, other_agent, resource_id, logger):
    interaction_thershold = 0.55

    interaction_trust_value = calculate_interaction_trust(agent, other_agent, )

    role_based_trust_value = evaluate_trust(interaction_trust_value)

    if interaction_trust_value > interaction_thershold:

        print(f"witness values are not needed as {interaction_trust_value} > {role_based_trust_value}")

    else:
        from interaction_trust import calculate_interaction_trust


from role_based_trust import evaluate_trust


def final_trust_outcome(agent, other_agent, resource_id, logger):
    interaction_threshold = 0.55

    interaction_trust_value, interaction_reliability = calculate_interaction_trust(logger.ratings, agent, other_agent,
                                                                                   resource_id)

    role_based_trust_value = evaluate_trust(logger.rule_database, agent, other_agent, resource_id)

    final_trust = (interaction_trust_value * interaction_reliability + role_based_trust_value) / 2

    if final_trust > interaction_threshold:
        return "Trustworthy"
    else:
        return "Not trustworthy"




