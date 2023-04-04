<template>
  <div class="postsRules">
    <div class="postsRulesTitle">
      <h2>Règles d'utilisations</h2>
    </div>
    <div class="postsRulesBloc">
      <div class="rulesItem">1. Pas de pornographie</div>
      <div class="rulesItem">2. Pas de violence ni de contenu sanglant</div>
      <div class="rulesItem">3. Pas de discours de haine et d'intimidation</div>
      <div class="rulesItem">4. Pas de spam ni de manipulation</div>
      <div class="rulesItem">5. Aucun contenu trompeur</div>
      <div class="rulesItem">6. Aucune activité illégale</div>
      <div class="rulesItem">7. Pas d'usurpation d'identité</div>
      <div class="rulesItem">8. Aucune violation du droit d'auteur</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Posts-rules",
};
</script>
<style scoped>
.postsRules {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 100%;
  margin-bottom: 5px;
  margin-top: 5px;
}
.postsRulesTitle {
  background-color: #f7f7f7;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 30px;
  margin-bottom: 20px;
}
.postsRulesTitle {
  text-align: center;
}
.postsRulesTitle h2 {
  margin: 0;
  color: #2c3e50;
}
.postsRulesBloc {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: flex-start;
  height: auto;
  padding: 0px 30px;
  background-color: white;
  padding-bottom: 20px;
}
.rulesItem {
  width: 50%;
  text-align: start;
  margin: 5px;
  font-weight: bold;
  color: #797676;
  letter-spacing: 0.1rem;
  line-height: 1.5rem;
}
</style>
