<script>
    import { goto } from '$app/navigation';
    import { rebusPoints, totalPoints, riddlePoints } from '../../lib/stores.js';
    import { Tooltip, Button } from "flowbite-svelte";
    let cells = $state([
        ["⏲️", "🍵", "⑂🪵", "🪜"],
        ["🖋️", "♾️", "🐾", "👥"],
        ["≡", "🖋️", "🔑", "🌿"],
        ["🚽💧", "🪨🌱🟢", "↩️", "🧝‍♀️"],
        ["🏛️", "🌳", "👨‍👩‍👧‍👦", "🎒"]
    ]);

    let answer_rebus = $state([
        ["⏲️", "🖋️", "♾️", "🏛️"],
        ["🍵", "≡", "👥", "🌳"],
        ["🚽💧", "🖋️", "🧝‍♀️", "👨‍👩‍👧‍👦"],
        ["↩️", "🐾", "🔑", "🎒"]
    ]);

    let answer_riddle = $state([
        ["⑂🪵"],
        ["🪨🌱🟢"],
        ["🪜"],
        ["🌿"]
    ]);

    let riddleCells = $state([["I grow unseen, yet hold the earth. What am I?", ""], ["I carpet stones and ancient girth. What am I?", ""], ["I lead you up, or take you down. What am I?", ""], ["I slowly climb without a sound. What am I?", ""]]); 
    let rebusCells = $state([["", "", "",""], ["", "", "",""], ["", "", "",""], ["", "", "",""]]);

    let selected = $state({ type: null, row: null, col: null });
    let history = $state([]); 

    function getValue(type, r, c) {
        if (type === 'main') return cells[r][c];
        if (type === 'riddle') return riddleCells[r][c];
        if (type === 'rebus') return rebusCells[r][c];
        return "";
    }

    function setValue(type, r, c, val) {
        if (type === 'main') cells[r][c] = val;
        else if (type === 'riddle') riddleCells[r][c] = val;
        else if (type === 'rebus') rebusCells[r][c] = val;
    }

    function handleCellClick(type, row, col) {
        let value = getValue(type, row, col);

        if (selected.type === null) {
            if (value !== "") {
                selected = { type, row, col };
            }
        } else {
            // RESTRICTION: Do not replace if cell is occupied
            if (value !== "") {
                selected = { type: null, row: null, col: null };
                return;
            }

            // Record move for Undo
            history.push({
                from: { ...selected },
                to: { type, row, col },
                val: getValue(selected.type, selected.row, selected.col)
            });

            // Perform move
            setValue(type, row, col, getValue(selected.type, selected.row, selected.col));
            setValue(selected.type, selected.row, selected.col, "");
            
            selected = { type: null, row: null, col: null };
        }
    }

    function undo() {
        if (history.length === 0) return;
        let lastMove = history.pop();
        
        setValue(lastMove.from.type, lastMove.from.row, lastMove.from.col, lastMove.val);
        setValue(lastMove.to.type, lastMove.to.row, lastMove.to.col, "");
        
        selected = { type: null, row: null, col: null };
    }
  

    function handleClick() {
        if (confirm("Are you sure you want to submit your answers?")) {
            let puzzlePoints = 0;
            
            // Riddles: 1 point each (4 points max)
            for (let i = 0; i < 4; i++) {
                if (riddleCells[i][1] === answer_riddle[i][0]) {
                    puzzlePoints += 1;
                    riddlePoints.update(n => n + 1);
                }
            }
            
            // Rebus: 1 point per row (4 points max)
            // Check if each row matches any answer row by column position
            for (let r = 0; r < 4; r++) {
                let currentRow = rebusCells[r];
                let rowMatches = false;
                
                for (let answerRow of answer_rebus) {
                    if (currentRow[0] === answerRow[0] && 
                        currentRow[1] === answerRow[1] && 
                        currentRow[2] === answerRow[2] && 
                        currentRow[3] === answerRow[3]) {
                        rowMatches = true;
                        break;
                    }
                }
                
                if (rowMatches) {
                    puzzlePoints += 1;
                     rebusPoints.update(n => n + 1);
                }
            }
            
            totalPoints.update(n => n + puzzlePoints);
            console.log("Puzzle Points: " + puzzlePoints + ", Total: " + ($totalPoints));
            goto('/story');
        }
    }
</script>

<main>
    <link rel="stylesheet" href="../src/public/styles.css">
    <div class="container">
        <div class="border">
         <div class = "top-border frame-bar">
         <div class="header-left">
          <a href="/" class="home-link">
            <img src="../src/lib/assets/favicon.svg" alt="Home" width = "200"/>
          </a>
          </div>
          <div class="header-right">
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
        </div>
        <div>
            <table class="table">
                <tbody>
                    {#each cells as row, r}
                        <tr>
                            {#each row as val, c}
                                <td class:selected={selected.type==='main' && selected.row===r && selected.col===c}
                                    onclick={() => handleCellClick('main', r, c)}>{val}</td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>

            <div class="split">
                <div class="lr">Riddle</div> 
                <div class="lr">Rebus</div>
            </div>

            <div class="tables-wrapper">
                <table class="table_riddle">
                    <tbody>
                        {#each riddleCells as row, r}
                            <tr>
                                {#each row as val, c}
                                    <td class:selected={selected.type==='riddle' && selected.row===r && selected.col===c}
                                        onclick={() => handleCellClick('riddle', r, 1)}>{val}</td>
                                {/each}
                            </tr>
                        {/each}
                    </tbody>
                </table>

                <table class="table_rebus">
                    <tbody>
                        {#each rebusCells as row, r}
                            <tr>
                                {#each row as val, c}
                                    <td class:selected={selected.type==='rebus' && selected.row===r && selected.col===c}
                                        onclick={() => handleCellClick('rebus', r, c)}>{val}</td>
                                {/each}
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            <div class="center" id = "root">
                <button onclick={handleClick} class='btn-group'>Enter</button>
                <button onclick={undo} class='btn-group'>Undo</button>
            </div>
           </div>
           <footer class="footer"> <p>© 2026 Gist | <a href="/terms">Terms</a></p> </footer>
        </div>
    </div>
</main>