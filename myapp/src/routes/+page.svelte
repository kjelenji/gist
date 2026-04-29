<script lang="ts">
 import { Tooltip, Button } from "flowbite-svelte";
 import { goto } from '$app/navigation';
  
 function handleClick() {
    // Navigate to the '/dashboard' route
    goto('/puzzle');
  }
</script>

<main>
    <link rel="stylesheet" href="../src/public/styles.css">
    <title>
      Gist
    </title>
    <div class="container">
      <div class = "border">
        <div class = "top-border">  
          <Button id="info">ⓘ</Button>
          <Tooltip triggeredBy="#info" placement="bottom" strategy="fixed" class="minimal-tooltip">
            <div class="tooltip-container">
              <div class="tooltip-header">How to Play</div>
              
              <div class="step">
                <span class="step-label">Part 1: Riddles</span>
                <p>Sort the correct icon into the slot to claim your clue.</p>
              </div>
              
              <div class="step">
                <span class="step-label">Part 2: Rebus</span>
                <p>Sort 16 icons to form phonetic sounds, like "Backpack" (Back + Paw + Key + Pack).</p>
              </div>
              
              <div class="step">
                <span class="step-label">Part 3: Mad Libs</span>
                <p>Complete the story sequence using the icons you collected.</p>
              </div>
            </div>
          </Tooltip>
         <Button class="btn-group" id = "leaderboard">🜲</Button>
         <Tooltip triggeredBy="#leaderboard" placement="bottom" strategy="fixed" class="minimal-tooltip"> 
            <div class="tooltip-container">
              <div class="tooltip-header">Leaderboard</div>
              <div class="step">
                <span class="step-label">Coming Soon</span>
              </div>
            </div>
          </Tooltip>
          
        </div>
        
        <div class = "inner-border">
          <div class="center">
              <img src="../src/public/icon.png" width="250" alt="Gist Logo">
          </div>
        
          <h3 class="text">Solve puzzles to get <br> the gist of the story!</h3>
    
          <div class="center">
            <div  class="split">
              <div id = "root">
                <button onclick={handleClick} class = "btn-group>" >Enter</button>
              </div>
              <div id = "root">
                <button class = "btn-group">Log In</button>
              </div>
            </div>
          </div>
          <h3 class="text">Demo</h3>
        </div>
          <footer class="footer"> <p>© 2026 Gist | <a href="/terms">Terms</a></p> </footer>
     </div>
    </div>
</main>